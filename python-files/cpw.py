import pymysql
import time
import sys
id = sys.argv[1]
pw = sys.argv[2]
conn = pymysql.connect(host="127.0.0.1", port=3306, user='Lightspeed30', password="!!Vlxj1215", db="userinfo")
cur = conn.cursor()
query = f'SELECT pw FROM `userinfo` where id="{id}";'
cur.execute(query)
conn.commit()
comparepw = cur.fetchall()[0][0]
if pw == comparepw:
    print(1)
else: print(0)


