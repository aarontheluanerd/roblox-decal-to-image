
*This used to be a proxy to allow roblox to communicate with a cloudflare worker of mine, but roblox now magically accepts the worker direcly...*

Here's how to use this DecalId to ImageId converter:

**Call a GET request to https://roblox-decal-to-image-convert.aarontheluanerd.workers.dev/?id=DECAL-ID-HERE via lua**

Very simple, just use HttpService to make a GET request to the worker: (In a server-sided script)

```lua

local HttpService = game.HttpService
local WorkerURL = "https://roblox-decal-to-image-convert.aarontheluanerd.workers.dev/?id=".. tostring(id)

local function convertDecalIdToImageId(id : number) : boolean, string

    local success, response = pcall(function()
		return HttpService:GetAsync(PROXY_URL)
	end)

	if not success then
		return false, "Request failed: " .. tostring(response)
	end

	local assetUrl = string.match(response, "<url>(.-)</url>") -- extract the url from the xml
	
	if assetUrl then
		return true, assetUrl
	else
		return false, "No URL found in response"
	end

end

-- Usage Example

local assetId = 104098993469911
local assetUrl = getDecalAssetId(assetId) 

if assetUrl then 
    print("Success! URL:", assetUrl)
else 
    warn("Failed to get asset URL")
end


```

That's it, no more complications.
The worker has a roblox cookie, which means it shouldn't return any authentication errors.
All of this is done with free tools, which means it's pretty possible that this method of converting Decal IDs to Image IDs won't go away any time soon.

**Made with the help of Deepseek and ChatGPT (because I'm illiterate with JavaScript and html, I only "specialize" in lua.)**