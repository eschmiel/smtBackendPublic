import { modulePaths, TweetDTOinterface } from '../../../configs/mainConfig';

const db = require(modulePaths.database);
const TweetDTO = require(modulePaths.tweetDTO);
const sql = require(modulePaths.sql).tweets;


function TweetDAO() {};


TweetDAO.prototype.load = async function(post_id: number) {	
	let tweet = await db.one(sql.loadTweet, { post_id: post_id });
	
	var dto: TweetDTOinterface = new TweetDTO(tweet);
	
	return dto;
}


TweetDAO.prototype.getUserTweets = async function (user_id: number) {
	let tweets = await db.any(sql.getUserTweets, { user_id: user_id });

	let dtos: Array<TweetDTOinterface> = [];

	tweets.forEach((tweet) => {
		let dto: TweetDTOinterface = new TweetDTO(tweet);

		dtos.push(dto);
	});

	return dtos;
}


export = new TweetDAO();