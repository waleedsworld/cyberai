import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { JsonViewer } from "@/components/ui/json-viewer"
import { EmptyState } from "@/components/ui/empty-state"
import {
  Globe,
  Play,
  Copy,
  Settings,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Database,
  Search,
  Trash2,
  Plus,
  Info,
  Terminal,
  Check,
  Timer
} from "lucide-react"
import { API_BASE_URL } from "@/lib/api-base";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const ApiTest = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [activeEndpoint, setActiveEndpoint] = useState("")
  const [copied, setCopied] = useState(false)

  const BASE_URL = API_BASE_URL

  const makeRequest = async (method: string, endpoint: string, body?: any) => {
    setLoading(true)
    setActiveEndpoint(endpoint)
    const startedAt = performance.now()

    try {
      const config: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      }

      if (body) {
        config.body = JSON.stringify(body)
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, config)
      const data = await response.json()

      setResponse({
        status: response.status,
        statusText: response.statusText,
        data,
        method,
        endpoint,
        duration: Math.round(performance.now() - startedAt),
      })

      toast({
        title: response.ok ? "Success" : "Error",
        description: `${method} ${endpoint} - ${response.status}`,
        variant: response.ok ? "default" : "destructive"
      })
    } catch (error) {
      setResponse({
        status: 0,
        statusText: "Network Error",
        data: { error: error instanceof Error ? error.message : "Unknown error" },
        method,
        endpoint,
        duration: Math.round(performance.now() - startedAt),
      })

      toast({
        title: "Network Error",
        description: "Failed to connect to API",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
    toast({
      title: "Copied!",
      description: "Copied to clipboard",
    })
  }

  // Region Management Forms
  const RegionForms = () => {
    const [regionName, setRegionName] = useState("Australia")
    const [regionId, setRegionId] = useState("reg_au01")
    const [newLaws, setNewLaws] = useState(false)

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create/Get Region
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="region-name">Region Name</Label>
              <Input
                id="region-name"
                value={regionName}
                onChange={(e) => setRegionName(e.target.value)}
                placeholder="Australia"
              />
            </div>
            <Button 
              onClick={() => makeRequest("POST", "/regions/", { name: regionName })}
              disabled={loading}
              className="w-full"
            >
              <Play className="w-4 h-4 mr-2" />
              Create/Get Region
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              List Regions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => makeRequest("GET", "/regions/?page=1&per=20")}
              disabled={loading}
              className="w-full"
            >
              <Search className="w-4 h-4 mr-2" />
              List All Regions
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Get Region Laws
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="region-id-laws">Region ID</Label>
              <Input
                id="region-id-laws"
                value={regionId}
                onChange={(e) => setRegionId(e.target.value)}
                placeholder="reg_au01"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="new-laws"
                checked={newLaws}
                onChange={(e) => setNewLaws(e.target.checked)}
                className="rounded"
              />
              <Label htmlFor="new-laws">Force fetch new laws</Label>
            </div>
            <Button 
              onClick={() => makeRequest("GET", `/regions/${regionId}/laws?newlaws=${newLaws}`)}
              disabled={loading}
              className="w-full"
            >
              <FileText className="w-4 h-4 mr-2" />
              Get Laws
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Delete Region
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="region-id-delete">Region ID</Label>
              <Input
                id="region-id-delete"
                value={regionId}
                onChange={(e) => setRegionId(e.target.value)}
                placeholder="reg_au01"
              />
            </div>
            <Button 
              onClick={() => makeRequest("DELETE", `/regions/${regionId}`)}
              disabled={loading}
              variant="destructive"
              className="w-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Region
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Site Management Forms
  const SiteForms = () => {
    const [siteRegionId, setSiteRegionId] = useState("reg_au01")
    const [baseUrl, setBaseUrl] = useState("https://example.com")
    const [siteId, setSiteId] = useState("")
    const [pageUrl, setPageUrl] = useState("")
    const [pageLimit, setPageLimit] = useState(5)

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Register Site
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site-region-id">Region ID</Label>
              <Input
                id="site-region-id"
                value={siteRegionId}
                onChange={(e) => setSiteRegionId(e.target.value)}
                placeholder="reg_au01"
              />
            </div>
            <div>
              <Label htmlFor="base-url">Base URL</Label>
              <Input
                id="base-url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <Button 
              onClick={() => makeRequest("POST", "/sites/", { region_id: siteRegionId, base_url: baseUrl })}
              disabled={loading}
              className="w-full"
            >
              <Globe className="w-4 h-4 mr-2" />
              Register Site
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              Get Site Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site-id-info">Site ID</Label>
              <Input
                id="site-id-info"
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                placeholder="site_example_com_1755960223315062"
              />
            </div>
            <Button 
              onClick={() => makeRequest("GET", `/sites/${siteId}`)}
              disabled={loading}
              className="w-full"
            >
              <Info className="w-4 h-4 mr-2" />
              Get Site Info
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Extract Site Pages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site-id-pages">Site ID</Label>
              <Input
                id="site-id-pages"
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                placeholder="site_example_com_1755960223315062"
              />
            </div>
            <div>
              <Label htmlFor="page-limit">Page Limit</Label>
              <Input
                id="page-limit"
                type="number"
                value={pageLimit}
                onChange={(e) => setPageLimit(Number(e.target.value))}
                placeholder="5"
              />
            </div>
            <Button 
              onClick={() => makeRequest("GET", `/sites/${siteId}/pages?limit=${pageLimit}`)}
              disabled={loading}
              className="w-full"
            >
              <FileText className="w-4 h-4 mr-2" />
              Extract Pages
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Register Custom Page
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="site-id-custom">Site ID</Label>
              <Input
                id="site-id-custom"
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                placeholder="site_example_com_1755960223315062"
              />
            </div>
            <div>
              <Label htmlFor="page-url">Page URL</Label>
              <Input
                id="page-url"
                value={pageUrl}
                onChange={(e) => setPageUrl(e.target.value)}
                placeholder="https://example.com/specific-page"
              />
            </div>
            <Button 
              onClick={() => makeRequest("POST", `/sites/${siteId}/pages`, { url: pageUrl })}
              disabled={loading}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Register Page
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Compliance Checking Forms
  const ComplianceForms = () => {
    const [complianceRegionId, setComplianceRegionId] = useState("reg_au01")
    const [urls, setUrls] = useState("https://zuhd.store")
    const [jobId, setJobId] = useState("")
    const [pageId, setPageId] = useState("")

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Direct Compliance Check
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="compliance-region-id">Region ID</Label>
              <Input
                id="compliance-region-id"
                value={complianceRegionId}
                onChange={(e) => setComplianceRegionId(e.target.value)}
                placeholder="reg_au01"
              />
            </div>
            <div>
              <Label htmlFor="urls">URLs (comma-separated for multiple)</Label>
              <Textarea
                id="urls"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                placeholder="https://zuhd.store, https://example.com"
                rows={3}
              />
            </div>
            <Button 
              onClick={() => {
                const urlList = urls.split(',').map(url => url.trim()).filter(url => url)
                const body = urlList.length === 1 ? { urls: urlList[0] } : { urls: urlList }
                makeRequest("POST", `/region/${complianceRegionId}/check_compliance`, body)
              }}
              disabled={loading}
              className="w-full"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Check Compliance
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Get Job Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="job-id-status">Job ID</Label>
              <Input
                id="job-id-status"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                placeholder="job_d42950eb"
              />
            </div>
            <Button 
              onClick={() => makeRequest("GET", `/complaince_job/${jobId}`)}
              disabled={loading}
              className="w-full"
            >
              <Clock className="w-4 h-4 mr-2" />
              Get Status
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Get Job Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="job-id-report">Job ID</Label>
              <Input
                id="job-id-report"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                placeholder="job_d42950eb"
              />
            </div>
            <Button 
              onClick={() => makeRequest("GET", `/complaince_job/${jobId}/report`)}
              disabled={loading}
              className="w-full"
            >
              <FileText className="w-4 h-4 mr-2" />
              Get Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Get Page Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="page-id-report">Page ID</Label>
              <Input
                id="page-id-report"
                value={pageId}
                onChange={(e) => setPageId(e.target.value)}
                placeholder="temp_pg_b933229d"
              />
            </div>
            <Button 
              onClick={() => makeRequest("GET", `/pages/${pageId}/complaince_report`)}
              disabled={loading}
              className="w-full"
            >
              <FileText className="w-4 h-4 mr-2" />
              Get Page Report
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const ResponseDisplay = () => {
    if (!response) return null

    const getStatusColor = (status: number) => {
      if (status >= 200 && status < 300) return "text-green-500"
      if (status >= 400 && status < 500) return "text-yellow-500"
      if (status >= 500) return "text-red-500"
      return "text-muted-foreground"
    }

    const ok = response.status >= 200 && response.status < 300

    return (
      <Card className="mt-6 overflow-hidden border-white/10 transition-shadow duration-300 hover:shadow-[0_0_50px_-12px_rgba(208,32,48,0.35)]">
        {/* status accent rail */}
        <div
          className={`h-1 w-full ${
            ok
              ? "bg-gradient-to-r from-emerald-500/70 via-emerald-400/40 to-transparent"
              : "bg-gradient-to-r from-[#d02030] via-[#f52b43]/50 to-transparent"
          }`}
        />
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-base">
              <Terminal className="h-4 w-4 text-[#ff8a96]" />
              Response
            </span>
            <div className="flex items-center gap-2">
              <Badge variant={ok ? "default" : "destructive"} className="tabular-nums">
                {response.status} {response.statusText}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="transition-colors"
                onClick={() => copyToClipboard(JSON.stringify(response.data, null, 2))}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* request meta strip */}
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 font-mono text-xs">
            {response.method && (
              <span className="font-semibold text-[#ff8a96]">{response.method}</span>
            )}
            <span className="truncate text-white/60">
              {response.endpoint || activeEndpoint}
            </span>
            <span className={`ml-auto flex items-center gap-1.5 ${getStatusColor(response.status)}`}>
              {ok ? <CheckCircle className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
              {response.status}
            </span>
            {typeof response.duration === "number" && (
              <span className="flex items-center gap-1 text-white/40">
                <Timer className="h-3.5 w-3.5" />
                {response.duration}ms
              </span>
            )}
          </div>
          <ScrollArea className="h-96 w-full rounded-md border border-white/10 bg-[#08080b] p-4">
            <JsonViewer data={response.data} />
          </ScrollArea>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Seo
        title="Compliance API Test | PointBlank"
        description="Interactive PointBlank API test interface for regions, sites, and compliance endpoints."
        path="/api-test"
        noIndex
      />
      <Header />
      <main className="pt-[128px] pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="px-4 py-2 text-sm bg-cyber-teal/20 text-cyber-teal border-cyber-teal/50 mb-6">
            <Settings className="w-4 h-4 mr-2" />
            API Testing Interface
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            PointBlank Compliance API Test
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Interactive testing interface for the PointBlank compliance API. Test all endpoints with real-time responses.
          </p>

          <div className="bg-gradient-to-r from-cyber-purple/10 to-cyber-teal/10 rounded-2xl p-6 border border-cyber-purple/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-cyber-teal" />
              <span className="font-mono text-sm text-muted-foreground">Base URL:</span>
            </div>
            <code className="block break-all text-cyber-teal font-mono">{BASE_URL}</code>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Tabs defaultValue="regions" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="regions">Regions</TabsTrigger>
                <TabsTrigger value="sites">Sites</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="regions" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Region Management</h3>
                  <Separator />
                  <RegionForms />
                </div>
              </TabsContent>
              
              <TabsContent value="sites" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Site Management</h3>
                  <Separator />
                  <SiteForms />
                </div>
              </TabsContent>
              
              <TabsContent value="compliance" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Compliance Checking</h3>
                  <Separator />
                  <ComplianceForms />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:sticky lg:top-24 lg:h-fit">
            {loading && (
              <Card className="mb-6 overflow-hidden border-white/10">
                <div className="h-1 w-full overflow-hidden bg-white/5">
                  <div className="h-full w-1/3 animate-[apitest-progress_1.1s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#f52b43] to-transparent" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f52b43] opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d02030]" />
                    </span>
                    <span className="font-mono text-sm text-white/70">
                      {activeEndpoint || "Sending request…"}
                    </span>
                  </div>
                  {/* skeleton lines */}
                  <div className="mt-5 space-y-2.5">
                    {[92, 74, 84, 58].map((w, i) => (
                      <div
                        key={i}
                        className="h-3 rounded bg-gradient-to-r from-white/[0.08] via-white/[0.14] to-white/[0.08] bg-[length:200%_100%] animate-[apitest-shimmer_1.4s_ease-in-out_infinite]"
                        style={{ width: `${w}%`, animationDelay: `${i * 120}ms` }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && !response && (
              <EmptyState
                icon={Terminal}
                title="No response yet"
                description="Pick an endpoint on the left and run a request. The live response and status will render here."
              />
            )}

            {!loading && <ResponseDisplay />}
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  )
}

export default ApiTest
