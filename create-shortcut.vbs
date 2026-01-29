Set oWS = WScript.CreateObject("WScript.Shell")
sLinkFile = "C:\\Users\\edenpc\\Desktop/WhatsApp.lnk"
Set oLink = oWS.CreateShortcut(sLinkFile)
oLink.TargetPath = "\\wsl.localhost\Ubuntu\home\edenpc\wpp\WhatsApp.bat"
oLink.WorkingDirectory = "."
oLink.Description = "WhatsApp Desktop"
oLink.IconLocation = "\\wsl.localhost\Ubuntu\home\edenpc\wpp\icon.ico"
oLink.Save
