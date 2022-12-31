
import pymysql
import sys
id = sys.argv[1]
pw = sys.argv[2]
email = str(sys.argv[3])
# email hash function
emailid= email.split('@')[0]
emailtype = str(email.split('@')[1])[:2]
hashvalue = ''
for i in range(len(emailid)):
    hashvalue += f'{((ord(emailid[i])*6731) % 31) % 10}'
emailhash = emailtype + hashvalue
conn = pymysql.connect(host="127.0.0.1", port=3306, user='Lightspeed30', password="!!Vlxj1215", db="userinfo")
cur = conn.cursor()
query = f'INSERT INTO `userinfo`(id,pw, email, emailverify, emailhash) values("{id}","{pw}", "{email}", 0, "{emailhash}")'
cur.execute(query)
conn.commit()
print(emailhash)

