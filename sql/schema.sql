CREATE TABLE rankings (
    id serial PRIMARY KEY,
    ranking_title text NOT NULL
);

CREATE TABLE topics(
    id serial PRIMARY KEY,
    topic_name text NOT NULL,
    topic_score INTEGER REFERENCES rankings (id)
);