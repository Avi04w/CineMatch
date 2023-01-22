from flask import Flask
import datetime
import pandas as pd
import numpy as np
from ast import literal_eval
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import csv
import re
import os

# Initializing flask app
app = Flask(__name__)

import warnings; warnings.simplefilter('ignore')
#Large data is a file of the dataset we are using to base the backend predictions off of. 
# large_data = pd.read_csv("/Users/aviwalia/Documents/CineMatch_Avi/backend/movies.csv")


#for cleaning the 'genre' column (original dataset will have things like 'id', 'name', etc.)
# large_data['genres'] = large_data['genres'].fillna('[]').apply(literal_eval).apply(lambda x: [i['name'] for i in x] if isinstance(x, list) else[])


#Creating a "master" csv file which matches up movies you have watched, to movies in the dataset.
#df1 is what we call "small-data"
df1=pd.read_csv('/Users/aviwalia/Documents/CineMatch_Avi/backend/NetflixViewingHistory.csv', encoding= 'unicode_escape')
df2=pd.read_csv('/Users/aviwalia/Documents/CineMatch_Avi/backend/movies.csv', encoding= 'unicode_escape')
df_final=pd.merge(df1,df2,on=['title'])
df_final.to_csv('final.csv',columns=['budget', 'genres', 'id', 'keywords', 'overview', 'production_companies', 'runtime', 'tagline', 'title', 'vote_average', 'vote_count'])
df_final = pd.read_csv('final.csv')

#performs a look up operation on all the movies that are present in data_links dataset
# large_data['id'] = large_data['id'].astype('int')

#GET RID OF THIS IF CODE IS WORKING WITH THIS COMMENTED OUT
# mov = large_data[large_data['id'].isin(small_data)] 
# mov.shape


def clean_title(title):
    title = re.sub("[^a-zA-Z0-9 ]", "", str(title))
    return title

df_final["clean_title"] = df_final["title"].apply(clean_title)

df_final["description"]=[re.sub(r"[\([{})\]]",'',str(desc)) for desc in df_final.overview]
df_final["description"]=[re.sub(r"[,]",'',str(desc)) for desc in df_final.description]
df_final["description"]=[re.sub("""['"]+""",'',str(desc)) for desc in df_final.description]
df_final["description"]=[re.sub("/\r?\n|\r/g",'',str(desc)) for desc in df_final.description]


def important_features(df_final):
    data=df_final.copy()
    for i in range(0, df_final.shape[0]):
        data["master"]=data["title"]+" "+data["genres"]+" "+data["tagline"]+" "+data["keywords"]+" "+data["overview"]+" "+data["production_companies"]
    return data

data=important_features(df_final)


data["ids"]=[i for i in range(0,data.shape[0])]

#calculate tfidf matrix on the overview of the movies
vectorizer = TfidfVectorizer(ngram_range=(1,2))
vectorizers = vectorizer.fit_transform(data["master"].apply(lambda x: np.str_(x)))

cos_sim = cosine_similarity(vectorizers) 


def give_recs(title):
    # movie_id=data[data.title==title]["ids"].values[0]
    # scores=list(enumerate(cos_sim[movie_id]))
    # sorted_scores=sorted(scores,key=lambda x:x[1],reverse=True)
    # sorted_scores=sorted_scores[1:]
    # movie_names = [data[movies[0]==data["ids"]]["title"].values[0] for movies in sorted_scores]
    
    # return movie_names


    movie_id=data[data.title==title]["ids"].values[0]
    scores=list(enumerate(cos_sim[movie_id]))
    sorted_scores=sorted(scores,key=lambda x:x[1],reverse=True)
    sorted_scores=sorted_scores[1:]
    movies=[data[movies[0]==data["ids"]]["title"].values[0] for movies in sorted_scores]
    return movies

def rec_first_ten(lst_movie):
    first_ten=[]
    count=0
    for movie in lst_movie:
        if count > 9:
            break
        count+=1
        first_ten.append(movie)
    return first_ten


lst_movies = ["Forest Gump", "The Matrix", "Straight Outta Compton", "The Departed", "American Gangster", "The Dark Knight", "The Punisher", "Ted"]

import random
lst = give_recs(lst_movies[random.randint(0, len(lst_movies) - 1)])
m = rec_first_ten(lst)


movies = {'Movie1': {'name': m[0]},
       "Movie2": {'name': m[1]},
       "Movie3": {'name': m[2]},
       "Movie4": {'name': m[3]},
       "Movie5": {'name': m[4]},
       "Movie6": {'name': m[5]},
       "Movie7": {'name': m[6]},
       "Movie8": {'name': m[7]},
       "Movie9": {'name': m[8]},
       "Movie10": {'name': m[9]}}

# Route for seeing a data
@app.route('/data')
def get_time():
   # Returning an api for showing in reactjs
   return {
       # Movies: {name, description} * 10
       'Movies': movies
       }


  
# Running app
if __name__ == '__main__':
   app.run(debug=True)


