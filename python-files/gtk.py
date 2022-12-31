#Get ToKen
import pymysql
import time
import sys
email = sys.argv[1]
conn = pymysql.connect(host="127.0.0.1", port=3306, user='Lightspeed30', password="!!Vlxj1215", db="userinfo")
cur = conn.cursor()
query = f'SELECT emailhash FROM `userinfo` where email = "{email}";'
cur.execute(query)
conn.commit()
token = cur.fetchall()[0][0]
print(token)