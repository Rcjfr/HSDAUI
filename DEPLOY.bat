@rem Deploy to QA/DEV
@REM ECHO %1
IF "%1" == "QA" (
	robocopy dist \\MEAPPT53.QCORPAA.AA.COM\D$\HSDA\HSDA.UI /E *.*
	@REM ECHO "DEPLOY TO QA"
	)
IF "%1" == "DEV" (
	robocopy dist \\MEAPND08.QCORPAA.AA.COM\D$\HSDA\HSDA.UI /E *.*
	@REM ECHO "DEPLOY TO DEV"
	)