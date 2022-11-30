
drop database if exists SoccerBase;
create database SoccerBase;
use SoccerBase;


/* create the user table*/
create table `user` (
                        `user_id` integer auto_increment,
                        `user_name` varchar(64) not null,
                        `password` varchar(64) not null,
                        `user_type` varchar(16) default 'user',
                        primary key (`user_id`)
);
Insert into user(user_name, password, user_type) values('admin','123456','admin');
/* create the post table*/
create table `post` (
                        `post_id` integer auto_increment,
                        `post_title` varchar(64) not null,
                        `user_name` varchar(64) not null,
                        `user_id` integer not null,
                        `content` longtext,
                        `block_name` varchar(64) not null,
                        `post_time` datetime,
                        `cover_url` varchar(255),
                        `link` varchar(64),
                        constraint `post_user` foreign key (`user_id`)
                        references `user`(`user_id`) on delete cascade,
                        primary key (`post_id`)
);
/* create the comment table*/
create table `comment` (
                        `comment_id` integer auto_increment,
                        `user_name` varchar(64) not null,
                        `user_id` integer not null,
                        `content` longtext,
                        `post_id` integer not null,
                        `comment_time` datetime,
                        constraint `comment_user` foreign key (`user_id`)
                            references `user`(`user_id`) on delete cascade,
                        constraint `comment_post` foreign key (`post_id`)
                            references `post`(`post_id`) on delete cascade,
                        primary key (`comment_id`)
);
/* create the team table*/
create table `team` (
                           `team_name` varchar(64) not null,
                           `country` varchar(64) not null,
                           `city` varchar(64) not null,
                           `coach` varchar(64) not null,
                           `team_avatar_url` longtext,
                           `team_content` longtext,
                           primary key (`team_name`)
);
/* create the player table*/
create table `player` (
                        `player_id` integer auto_increment,
                        `player_name` varchar(64) not null,
                        `country` varchar(64) not null,
                        `team_name` varchar(64) not null,
                        `player_value` varchar(64) not null,
                        `player_avatar_url` longtext,
                        `position` varchar(64),
                        constraint `player_team` foreign key (`team_name`)
                            references `team`(`team_name`) on delete cascade,
                        primary key (`player_id`)
);
