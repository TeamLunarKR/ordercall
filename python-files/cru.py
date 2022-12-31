import pymysql
import sys
id = 'abcdefjoon'
email = 'abcdefjoon@naver.com'
pw = '!!Vlxj1215'

# email hash function
emailid= email.split('@')[0]
emailtype = str(email.split('@')[1])[:2]
hashvalue = 0
for i in range(len(emailid)):
    hashvalue += ((int(emailid(i))*6731) % 31) % 10
emailhash = emailtype + f"{hashvalue}"
conn = pymysql.connect(host="127.0.0.1", port=3306, user='Lightspeed30', password="!!Vlxj1215", db="userinfo")
cur = conn.cursor()
query = f'INSERT INTO `userinfo`(id,pw, email, emailverify, emailhash) values("{id}","{pw}", "{email}", 0, "{emailhash}")'
cur.execute(query)
conn.commit()
print(emailhash)


