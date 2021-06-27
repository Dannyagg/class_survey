'use strict';

const db = require('./conn');

class ClassSurveyModel {
    constructor(id, topic_name, topic_score) {
        this.id = id;
        this.topic_name = topic_name;
        this.topic_score = topic_score;
    }
    static async getAllTopicData() {
        try {
            const response = await db.any(
                `SELECT topic_name, topic_score, ranking_title FROM topics
                    JOIN rankings
                    ON topics.topic_score = rankings.id
                ORDER BY topics.topic_name;
                `
            );
            return response;
        } catch (error) {
            console.error('ERROR: ', error);
            return error;
        }
    }
    static async getAllRankings() {
        try {
            const response = await db.any(
                `SELECT * FROM rankings;`
            );
            return response;
        } catch (error) {
            console.error('ERROR: ', error);
            return error;
        }
    }

    static async updateRanking(topic, rank_id) {
        try {
            const response = await db.result(
                `UPDATE topics SET topic_score = $1 WHERE topic_name = $2;`, [rank_id, topic]
            );
            return response;
        } catch (err) {
            console.log('ERROR', err.message);
            return err;
        }
    }
}

module.exports = ClassSurveyModel;