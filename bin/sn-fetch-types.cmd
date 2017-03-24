@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\..\sn-client-js\dist_commands\sn-fetch-types.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\..\sn-client-js\dist_commands\sn-fetch-types.js" %*
)