Set WshShell = CreateObject("WScript.Shell")
DesktopPath = WshShell.SpecialFolders("Desktop")
Set oShellLink = WshShell.CreateShortcut(DesktopPath & "\WhatsApp.lnk")
oShellLink.TargetPath = WshShell.CurrentDirectory & "\WhatsApp.bat"
oShellLink.WindowStyle = 1
oShellLink.Description = "WhatsApp Desktop"
oShellLink.WorkingDirectory = WshShell.CurrentDirectory
oShellLink.Save
WScript.Echo "Atalho criado com sucesso na area de trabalho!"
