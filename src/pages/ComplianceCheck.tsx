import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, Globe, Shield, CheckCircle, AlertTriangle, Loader2, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { API_BASE_URL } from '@/lib/api-base';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

const gccRegions = [
  { id: 'saudi-arabia', name: 'Saudi Arabia' },
  { id: 'uae', name: 'United Arab Emirates (UAE)' },
  { id: 'kuwait', name: 'Kuwait' },
  { id: 'qatar', name: 'Qatar' },
  { id: 'oman', name: 'Oman' },
  { id: 'bahrain', name: 'Bahrain' }
];

const ComplianceCheck = () => {
  const [currentStep, setCurrentStep] = useState<'input' | 'location' | 'loading' | 'laws' | 'confirm' | 'scanning' | 'results'>('input');
  const [url, setUrl] = useState('');
  const [additionalUrls, setAdditionalUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [actualRegionId, setActualRegionId] = useState(''); // The real region ID from API
  const [customLocation, setCustomLocation] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [lawsData, setLawsData] = useState<any>(null);
  const [scanResults, setScanResults] = useState<any>(null);
  const [jobId, setJobId] = useState('');
  const { toast } = useToast();

  const handleUrlSubmit = () => {
    if (!url.trim()) {
      toast({ title: "Please enter a valid URL", variant: "destructive" });
      return;
    }
    
    // Clean the URL - remove any existing protocol
    let cleanUrl = url.trim();
    if (cleanUrl.startsWith('https://')) {
      cleanUrl = cleanUrl.replace('https://', '');
    }
    if (cleanUrl.startsWith('http://')) {
      cleanUrl = cleanUrl.replace('http://', '');
    }
    
    // Ensure it starts with https://
    const finalUrl = 'https://' + cleanUrl;
    setUrl(finalUrl);
    
    console.log('Original input:', url);
    console.log('Cleaned URL:', cleanUrl);
    console.log('Final URL:', finalUrl);
    
    setCurrentStep('location');
  };

  const handleLocationSelect = async (regionSelection: string) => {
    setSelectedRegion(regionSelection);
    setCurrentStep('loading');
    
    try {
      // Determine region name
      let regionName = '';
      if (regionSelection === 'custom') {
        regionName = customLocation;
      } else {
        regionName = gccRegions.find(r => r.id === regionSelection)?.name || regionSelection;
      }

      console.log('=== CREATING/CHECKING REGION ===');
      console.log('Region Name:', regionName);
      console.log('Region Selection:', regionSelection);
      
      // Create or get existing region
      const regionResponse = await fetch(`${API_BASE_URL}/regions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regionName })
      });
      
      console.log('Region creation response status:', regionResponse.status);
      
      if (!regionResponse.ok) {
        throw new Error(`Failed to create region: ${regionResponse.status}`);
      }
      
      const regionData = await regionResponse.json();
      console.log('Region data received:', regionData);
      
      // Store the actual region ID returned by the API
      setActualRegionId(regionData.region_id);
      
      // If region already exists, we might get laws in the response
      if (regionData.existing && regionData.laws) {
        console.log('Using existing region with cached laws');
        setLawsData(regionData.laws);
        setCurrentStep('laws');
        return;
      }
      
      // Fetch laws for the region
      console.log('Fetching laws for region:', regionData.region_id);
      const lawsResponse = await fetch(`${API_BASE_URL}/regions/${regionData.region_id}/laws?newlaws=false`);
      
      if (!lawsResponse.ok) {
        throw new Error(`Failed to fetch laws: ${lawsResponse.status}`);
      }
      
      const laws = await lawsResponse.json();
      console.log('Laws received:', laws);
      setLawsData(laws);
      setCurrentStep('laws');
      
    } catch (error) {
      console.error('Error in location selection:', error);
      toast({ 
        title: "Failed to load region", 
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive" 
      });
      setCurrentStep('location');
    }
  };

  const addUrl = () => {
    if (newUrl.trim() && !additionalUrls.includes(newUrl)) {
      setAdditionalUrls([...additionalUrls, newUrl]);
      setNewUrl('');
    }
  };

  const removeUrl = (urlToRemove: string) => {
    setAdditionalUrls(additionalUrls.filter(u => u !== urlToRemove));
  };

  const runScan = async () => {
    setCurrentStep('scanning');
    
    const allUrls = [url, ...additionalUrls];
    console.log('Starting scan for URLs:', allUrls);
    console.log('Selected region:', selectedRegion);
    
    try {
      // Log the exact request being sent
      const requestUrl = `${API_BASE_URL}/region/${actualRegionId}/check_compliance`;
      const requestBody = { urls: allUrls };
      
      console.log('=== COMPLIANCE CHECK REQUEST ===');
      console.log('Selected Region:', selectedRegion);
      console.log('Actual Region ID:', actualRegionId);
      console.log('URL:', requestUrl);
      console.log('Method: POST');
      console.log('Headers:', { 'Content-Type': 'application/json' });
      console.log('Body:', JSON.stringify(requestBody, null, 2));
      console.log('================================');
      
      // Start compliance check using the actual region ID
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response body:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const jobData = await response.json();
      console.log('Job data received:', jobData);
      
      if (!jobData.job_id) {
        console.error('No job_id in response:', jobData);
        throw new Error('No job ID received from server');
      }
      
      setJobId(jobData.job_id);
      console.log('Job ID set:', jobData.job_id);
      
      // Poll for results
      const pollForResults = async () => {
        console.log('Polling for job status:', jobData.job_id);
        
        const statusResponse = await fetch(`${API_BASE_URL}/complaince_job/${jobData.job_id}`);
        console.log('Status response:', statusResponse.status);
        
        if (!statusResponse.ok) {
          console.error('Status check failed:', statusResponse.status);
          throw new Error(`Status check failed: ${statusResponse.status}`);
        }
        
        const status = await statusResponse.json();
        console.log('Job status:', status);
        
        if (status.status === 'completed') {
          console.log('Job completed, fetching report...');
          const reportResponse = await fetch(`${API_BASE_URL}/complaince_job/${jobData.job_id}/report`);
          
          if (!reportResponse.ok) {
            throw new Error(`Report fetch failed: ${reportResponse.status}`);
          }
          
          const results = await reportResponse.json();
          console.log('Results received:', results);
          setScanResults(results);
          setCurrentStep('results');
        } else if (status.status === 'failed') {
          throw new Error('Scan failed');
        } else {
          console.log('Job still in progress, polling again in 3 seconds...');
          setTimeout(pollForResults, 3000);
        }
      };
      
      setTimeout(pollForResults, 3000);
    } catch (error) {
      console.error('Scan error:', error);
      toast({ 
        title: "Scan failed", 
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive" 
      });
      setCurrentStep('confirm');
    }
  };

  const restart = () => {
    setCurrentStep('input');
    setUrl('');
    setAdditionalUrls([]);
    setSelectedRegion('');
    setActualRegionId('');
    setCustomLocation('');
    setShowCustomInput(false);
    setLawsData(null);
    setScanResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <Seo
        title="Website Compliance Check | PointBlank"
        description="Run PointBlank's website compliance workflow across GCC jurisdictions, mapped laws, and evidence-backed cyber findings."
        path="/compliance-check"
      />
      <Header />
      <main className="pt-[108px]">
      <div className="container mx-auto px-4 py-8">
        
        {/* Step 1: URL Input */}
        {currentStep === 'input' && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge variant="secondary" className="mb-4 text-lg px-6 py-2">
                Free Compliance Check
              </Badge>
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Check Your Website's Compliance
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Ensure your website meets regional compliance requirements. Get detailed analysis in minutes.
              </p>
            </div>

            {/* Arrow pointing to input */}
            <div className="relative mb-8">
              <ArrowDown className="h-16 w-16 text-primary mx-auto animate-bounce" />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-primary font-semibold">
                Enter your website URL
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="flex gap-4 p-2 bg-card rounded-2xl shadow-2xl border-2 border-primary/20">
                <Input
                  placeholder="example.com or yourwebsite.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
                  className="text-lg h-14 border-0 bg-transparent focus-visible:ring-0 text-center"
                />
                <Button 
                  onClick={handleUrlSubmit}
                  size="lg"
                  className="h-14 px-8 bg-primary hover:bg-primary/90 font-semibold"
                >
                  Start Check
                </Button>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Comprehensive Analysis</h3>
                  <p className="text-sm text-muted-foreground">Deep scan of your website's compliance status</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Regional Laws</h3>
                  <p className="text-sm text-muted-foreground">Tailored to your specific region's requirements</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Instant Results</h3>
                  <p className="text-sm text-muted-foreground">Get your compliance report in minutes</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 2: Location Selection */}
        {currentStep === 'location' && (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Select Your Region</h2>
            <p className="text-muted-foreground mb-8">Choose the region whose compliance laws apply to your website</p>
            
            <div className="space-y-4">
              {gccRegions.map((region) => (
                <Card 
                  key={region.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/50"
                  onClick={() => handleLocationSelect(region.id)}
                >
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Globe className="h-6 w-6 text-primary" />
                      <span className="font-medium text-lg">{region.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Custom Location Input */}
              <Card className="border-dashed border-2 border-primary/30">
                <CardContent className="p-6">
                  {!showCustomInput ? (
                    <div 
                      className="cursor-pointer text-center"
                      onClick={() => setShowCustomInput(true)}
                    >
                      <div className="flex items-center justify-center gap-4">
                        <Globe className="h-6 w-6 text-muted-foreground" />
                        <span className="font-medium text-lg text-muted-foreground">
                          Other Location (Type to specify)
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Input
                        placeholder="Enter your location (e.g., United States, European Union)"
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && customLocation.trim()) {
                            handleLocationSelect('custom');
                          }
                        }}
                        className="text-center"
                        autoFocus
                      />
                      <div className="flex gap-2 justify-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setShowCustomInput(false);
                            setCustomLocation('');
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => customLocation.trim() && handleLocationSelect('custom')}
                          disabled={!customLocation.trim()}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 3: Loading */}
        {currentStep === 'loading' && (
          <div className="max-w-2xl mx-auto text-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Loading Compliance Laws</h2>
            <p className="text-muted-foreground">Fetching the latest regulatory requirements...</p>
          </div>
        )}

        {/* Step 4: Laws Preview */}
        {currentStep === 'laws' && lawsData && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Compliance Requirements</h2>
              <p className="text-muted-foreground">Here are the key laws your website will be checked against</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  {selectedRegion === 'custom' 
                    ? `${customLocation} Compliance Laws` 
                    : `${gccRegions.find(r => r.id === selectedRegion)?.name} Compliance Laws`
                  }
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
                    {lawsData.law_summary}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <Button 
                onClick={() => setCurrentStep('confirm')}
                size="lg"
                className="px-8"
              >
                Continue to URL Confirmation
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: URL Confirmation */}
        {currentStep === 'confirm' && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Confirm Your URLs</h2>
              <p className="text-muted-foreground">Review and add additional URLs to scan</p>
            </div>

            {/* Debug Panel */}
            <Card className="mb-6 bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-sm text-yellow-800">🔍 Debug Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-yellow-900">
                <div><strong>Selected Region:</strong> {selectedRegion}</div>
                <div><strong>Actual Region ID:</strong> {actualRegionId}</div>
                <div><strong>Region Name:</strong> {selectedRegion === 'custom' ? customLocation : gccRegions.find(r => r.id === selectedRegion)?.name}</div>
                <div><strong>API Endpoint:</strong> {API_BASE_URL}/region/{actualRegionId}/check_compliance</div>
                <div><strong>Request Body:</strong></div>
                <pre className="bg-yellow-100 p-2 rounded text-xs overflow-x-auto">
                  {JSON.stringify({ urls: [url, ...additionalUrls] }, null, 2)}
                </pre>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Primary URL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="font-medium">{url}</span>
                </div>
              </CardContent>
            </Card>

            {additionalUrls.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Additional URLs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {additionalUrls.map((additionalUrl, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <Globe className="h-5 w-5 text-primary" />
                        <span className="font-medium flex-1">{additionalUrl}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeUrl(additionalUrl)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Add More URLs (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="example.com"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && newUrl.trim()) {
                        // Clean the new URL
                        let cleanNewUrl = newUrl.trim();
                        if (cleanNewUrl.startsWith('https://')) {
                          cleanNewUrl = cleanNewUrl.replace('https://', '');
                        }
                        if (cleanNewUrl.startsWith('http://')) {
                          cleanNewUrl = cleanNewUrl.replace('http://', '');
                        }
                        const finalNewUrl = 'https://' + cleanNewUrl;
                        setAdditionalUrls([...additionalUrls, finalNewUrl]);
                        setNewUrl('');
                      }
                    }}
                  />
                  <Button 
                    onClick={() => {
                      if (newUrl.trim()) {
                        // Clean the new URL
                        let cleanNewUrl = newUrl.trim();
                        if (cleanNewUrl.startsWith('https://')) {
                          cleanNewUrl = cleanNewUrl.replace('https://', '');
                        }
                        if (cleanNewUrl.startsWith('http://')) {
                          cleanNewUrl = cleanNewUrl.replace('http://', '');
                        }
                        const finalNewUrl = 'https://' + cleanNewUrl;
                        setAdditionalUrls([...additionalUrls, finalNewUrl]);
                        setNewUrl('');
                      }
                    }} 
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-center space-x-4">
              <Button variant="outline" onClick={restart}>
                Start Over
              </Button>
              <Button onClick={runScan} size="lg" className="px-8">
                Run Compliance Scan
              </Button>
            </div>
          </div>
        )}

        {/* Step 6: Scanning */}
        {currentStep === 'scanning' && (
          <div className="max-w-2xl mx-auto text-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Scanning Your Website</h2>
            <p className="text-muted-foreground mb-4">
              Analyzing {[url, ...additionalUrls].length} URL(s) for compliance violations...
            </p>
            <p className="text-sm text-muted-foreground">This may take a few minutes</p>
          </div>
        )}

        {/* Step 7: Results */}
        {currentStep === 'results' && scanResults && (
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Compliance Results</h2>
              <p className="text-muted-foreground">Detailed analysis of your website's compliance status</p>
            </div>

            <div className="space-y-6">
              {scanResults.pages?.map((page: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      {page.url}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {page.findings?.map((finding: any, findingIndex: number) => (
                        <div key={findingIndex} className="border rounded-lg p-4">
                          <div className="flex items-start gap-3 mb-2">
                            {finding.status === 'pass' ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <h4 className="font-semibold">{finding.law}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{finding.details}</p>
                              {finding.evidence_snippet && (
                                <div className="mt-2 p-2 bg-muted rounded text-xs">
                                  <strong>Evidence:</strong> {finding.evidence_snippet}
                                </div>
                              )}
                            </div>
                            <Badge variant={finding.status === 'pass' ? 'default' : 'destructive'}>
                              {finding.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button onClick={restart} size="lg">
                Check Another Website
              </Button>
            </div>
          </div>
        )}
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComplianceCheck;
