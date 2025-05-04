This is a repo that acts as a proxy between Roblox Luau HTTP requests and Cloudflare workers.

heres an example code that deepseek gave me for the usage of this proxy:
```lua

local HttpService = game:GetService("HttpService")

local function getAssetInfo(assetId)
    local proxyUrl = "https://aarontheluanerd.github.io/roblox-decal-to-image/?id=" .. tostring(assetId)
    
    local success, response = pcall(function()
        return HttpService:GetAsync(proxyUrl, false, {
            -- These headers may help with some edge cases
            ["Accept"] = "application/json",
            ["User-Agent"] = "RobloxStudio"
        })
    end)
    
    if success then
        -- Parse the JSON response
        local success, decoded = pcall(function()
            return HttpService:JSONDecode(response)
        end)
        
        if success and decoded then
            -- The response should contain a location field with the asset URL
            if decoded.location then
                return decoded.location
            end
        end
        warn("Failed to parse asset delivery response:", response)
    else
        warn("HTTP Request failed:", response)
    end
    return nil
end

-- Example usage
local assetId = 104098993469911
local assetUrl = getAssetInfo(assetId)

if assetUrl then
    print("Asset URL:", assetUrl)
    
    -- For ImageLabel
    local imageLabel = Instance.new("ImageLabel")
    imageLabel.Image = assetUrl
    imageLabel.Size = UDim2.new(1, 0, 1, 0)
    imageLabel.Parent = script.Parent
else
    warn("Failed to get asset URL")
end

```

Made with the help of deepseek <3