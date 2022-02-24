import smtplib

server = smtplib.SMTP_SSL('smtp-pawolanmwen.alwaysdata.net', 465)
server.login("sandbox@loryleticee.com", "myqTem-0dejnu-wytwaw")
server.sendmail(
    "sandbox@loryleticee.com",
    "alexis@lebail.eu",
    "subject: Nouvelle image dispo sur le serveur \n Ce message vient de python. blib blop STOP.")
server.quit()