var ArticleSchema = new ArticleSchema({
    title: {type: String},
    date: {type: Date},
    url: {type: String}
});

var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;