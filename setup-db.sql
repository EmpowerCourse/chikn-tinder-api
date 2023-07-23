CREATE TABLE chickens (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25),
  location VARCHAR(25),
  imgUrl VARCHAR(500),
  description VARCHAR(500),
  updoots INTEGER,
  downdoots INTEGER
);

INSERT INTO chickens (name, location, imgUrl, description, updoots, downdoots)
VALUES
('Herbert', 'Winston-Salem', 'https://media.istockphoto.com/id/545343756/photo/chickens-on-traditional-free-range-poultry-farm.jpg?s=612x612&w=0&k=20&c=AXGb-A4jCpeTsoZEHQYTS43jHxMGkm-_yDVgx9J0uqc=', 'Eggstraordinary clucker, seeking peck-uliar match. I''m always up for a good roost, but I''m not just here for any poultry encounter.', 5, 1),

('Christina', 'Greensboro', 'https://a-z-animals.com/media/2021/08/Fear-of-Animals_-Alektorophobia.jpg', 'Who said chickens can''t fly? I''m ready to soar to new heights in the coop of love. I''m not here to just lay around. Swipe right if you''re ready for an eggs-tra special relationship.', 12, 0),

('Liam', 'Wilmington', 'https://www.worldatlas.com/r/w1200/upload/bd/c9/27/shutterstock-566117308.jpg', 'Laid back rooster, enjoys watching sunrises. Not your typical peck and run type. I''m here to find my perfect chick to rule the roost.', 7, 9),

('Sophie', 'Charlotte', 'https://animalsaotearoa.org/wp-content/uploads/2022/05/WEB-20220413-How-long-live-800x300-JC-Feature.png', 'Chick with attitude looking for a rooster who''s not afraid of a little pecking. Free-ranger and proud, I''m looking to find someone who can keep up with me on the farm.', 15, 2),

('George', 'Raleigh', 'https://cdn.knowyourchickens.com/wp-content/uploads/2019/09/pet-chicken.jpg', 'Farm-tastic rooster looking for his hen in a million. Swipe right if you''re ready to rule the roost together and enjoy those early morning worms.', 10, 3);