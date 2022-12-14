@rem Deploy to QA/DEV
@REM ECHO %1
IF "%1" == "QA" (
    ng build -e qa --output-hashing=all
	robocopy dist \\MEAPPT53.QCORPAA.AA.COM\D$\HSDA\HSDA.UI /E *.* /PURGE
    robocopy dist \\mewebt06.qcorpaa.aa.com\D$\HSDA\HSDA.UI /E *.* /PURGE
	@REM ECHO "DEPLOY TO QA"
	)
IF "%1" == "DEV" (
    ng build -e dev_env --output-hashing=all
	robocopy dist \\MEAPND08.QCORPAA.AA.COM\D$\HSDA\HSDA.UI /E *.* /PURGE
	@REM ECHO "DEPLOY TO DEV"
	)