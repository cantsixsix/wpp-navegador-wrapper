Set WshShell = CreateObject("WScript.Shell")
' Executa o WSL de forma invisível (sem mostrar terminal)
WshShell.Run "wsl.exe bash -c ""cd /home/edenpc/wpp && npm start""", 0, False
