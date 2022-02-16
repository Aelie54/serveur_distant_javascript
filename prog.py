import smtplib

server = smtplib.SMTP_SSL('smtp-pawolanmwen.alwaydata.net', 465)
server.login("sandbox@loryleticee.com", "myqTem-0dejnu-wytwaw")
server.sendmail( 
    "sandbox@loryleticee.com", 
    "myqTem-0dejnu-wytwaw"info@loryleticee.fr",
    "subject: Nouvelle image dispo sur le serveur \n Ce message vient de python. Blip blop STOP."
    )
server.quit()