import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function ApiKeySection() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [hasExistingKey, setHasExistingKey] = useState(true)

  const generateApiKey = () => {
    const newKey = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    setApiKey(newKey)
    setHasExistingKey(true)
    setShowConfirmDialog(false)
  }

  const handleGenerateClick = () => {
    if (hasExistingKey) {
      setShowConfirmDialog(true)
    } else {
      generateApiKey()
    }
  }

  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey)
    }
  }

  return (
    <>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-medium mb-1">API Key</h2>
          <p className="text-sm text-muted-foreground">Manage your API authentication key</p>
        </div>

        {apiKey ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input type="text" value={apiKey} readOnly className="font-mono text-sm bg-card border-border h-10" />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="border-border bg-card hover:bg-card/80 px-4"
              >
                Copy
              </Button>
            </div>
            <p className="text-xs text-amber-400/90">Save this key now. You won't be able to see it again.</p>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground">
              {hasExistingKey ? "You have an active API key" : "No API key generated"}
            </p>
            <Button
              onClick={handleGenerateClick}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {hasExistingKey ? "Regenerate" : "Generate Key"}
            </Button>
          </div>
        )}
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="border-border bg-card">
          <DialogHeader>
            <DialogTitle>Regenerate API Key?</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              This will invalidate your current API key. Any applications using the old key will stop working.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="border-border">
              Cancel
            </Button>
            <Button
              onClick={generateApiKey}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Regenerate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

