import React, { useState, useEffect } from 'react';

const AIModerator = () => {
    const [content, setContent] = useState('');
    const [moderationResult, setModerationResult] = useState(null);
    const [communitySummary, setCommunitySummary] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCommunitySummary();
    }, []);

    const fetchCommunitySummary = async () => {
        try {
            const response = await fetch('/api/moderation/summarize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    discussions: [
                        { id: 1, content: 'Discussion about solar energy' },
                        { id: 2, content: 'Zero waste tips' }
                    ]
                })
            });
            const data = await response.json();
            setCommunitySummary(data);
        } catch (error) {
            console.error('Error fetching community summary:', error);
        }
    };

    const checkContent = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/moderation/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content,
                    type: 'comment'
                })
            });
            const data = await response.json();
            setModerationResult(data);
        } catch (error) {
            console.error('Error checking content:', error);
        } finally {
            setLoading(false);
        }
    };

    const getSentimentColor = (sentiment) => {
        const colors = {
            'positive': 'text-green-600',
            'neutral': 'text-blue-600',
            'negative': 'text-red-600'
        };
        return colors[sentiment] || 'text-gray-600';
    };

    const getSentimentEmoji = (sentiment) => {
        const emojis = {
            'positive': '😊',
            'neutral': '😐',
            'negative': '😟'
        };
        return emojis[sentiment] || '🤖';
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">🤖 AI Community Moderator</h2>
                <p className="text-gray-600">Intelligent content filtering and community insights</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">✅ Content Safety Check</h3>
                    <form onSubmit={checkContent} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Enter your message or comment
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full border rounded-lg px-4 py-2 h-32 resize-none"
                                placeholder="Share your eco-friendly ideas..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:bg-gray-400"
                        >
                            {loading ? 'Analyzing...' : 'Check Content'}
                        </button>
                    </form>

                    {moderationResult && (
                        <div className="mt-4 border rounded-lg p-4 bg-gray-50">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-bold">Analysis Results</h4>
                                <span className={`text-2xl ${moderationResult.safe ? 'text-green-500' : 'text-red-500'}`}>
                                    {moderationResult.safe ? '✅' : '⚠️'}
                                </span>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Safety:</span>
                                    <span className="font-medium">
                                        {moderationResult.safe ? 'Safe to post' : 'Needs review'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Sentiment:</span>
                                    <span className={`font-medium ${getSentimentColor(moderationResult.sentiment)}`}>
                                        {getSentimentEmoji(moderationResult.sentiment)} {moderationResult.sentiment}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Confidence:</span>
                                    <span className="font-medium">{Math.round(moderationResult.confidence * 100)}%</span>
                                </div>
                                {moderationResult.categories && (
                                    <div className="mt-3 pt-3 border-t">
                                        <p className="text-gray-600 mb-2">Categories:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {moderationResult.categories.ecoFriendly && (
                                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                                    🌱 Eco-Friendly
                                                </span>
                                            )}
                                            {moderationResult.categories.educational && (
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                                    📚 Educational
                                                </span>
                                            )}
                                            {moderationResult.categories.community && (
                                                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                                                    👥 Community
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {moderationResult.suggestions.length > 0 && (
                                    <div className="mt-3 pt-3 border-t">
                                        <p className="text-red-600 font-medium">Suggestions:</p>
                                        <ul className="list-disc list-inside">
                                            {moderationResult.suggestions.map((suggestion, idx) => (
                                                <li key={idx} className="text-sm">{suggestion}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">📊 Community Insights</h3>
                    {communitySummary ? (
                        <div className="space-y-4">
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">Summary</h4>
                                <p className="text-sm text-gray-700">{communitySummary.summary}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-2">🔥 Trending Topics</h4>
                                <div className="flex flex-wrap gap-2">
                                    {communitySummary.keyTopics.map((topic, idx) => (
                                        <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-2">📝 Action Items</h4>
                                <ul className="space-y-2">
                                    {communitySummary.actionItems.map((item, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border-t pt-4">
                                <h4 className="font-semibold mb-2">📈 Participation Stats</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Total Messages</p>
                                        <p className="text-2xl font-bold">{communitySummary.participationStats.totalMessages}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Active Users</p>
                                        <p className="text-2xl font-bold">{communitySummary.participationStats.uniqueUsers}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-gray-600 mb-1">Engagement Rate</p>
                                        <div className="bg-gray-200 rounded-full h-3">
                                            <div
                                                className="bg-green-500 rounded-full h-3"
                                                style={{ width: `${communitySummary.participationStats.avgEngagement * 100}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-1">
                                            {Math.round(communitySummary.participationStats.avgEngagement * 100)}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-purple-50 rounded-lg p-4">
                                <h4 className="font-semibold mb-2">💬 Overall Sentiment</h4>
                                <p className={`text-lg font-medium ${getSentimentColor(communitySummary.sentiment)}`}>
                                    {getSentimentEmoji(communitySummary.sentiment)} {communitySummary.sentiment}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            Loading community insights...
                        </div>
                    )}
                </div>
            </div>

            <div className="border rounded-lg p-6 bg-gradient-to-r from-purple-50 to-blue-50">
                <h3 className="text-xl font-bold mb-4">🎯 AI Moderation Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">🛡️</span>
                        <div>
                            <h4 className="font-semibold">Automatic Filtering</h4>
                            <p className="text-sm text-gray-600">Real-time detection of inappropriate content</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">📊</span>
                        <div>
                            <h4 className="font-semibold">Sentiment Analysis</h4>
                            <p className="text-sm text-gray-600">Understand community mood and trends</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">🔍</span>
                        <div>
                            <h4 className="font-semibold">Content Categorization</h4>
                            <p className="text-sm text-gray-600">Automatically organize discussions by topic</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <span className="text-2xl mr-3">💡</span>
                        <div>
                            <h4 className="font-semibold">Smart Summaries</h4>
                            <p className="text-sm text-gray-600">AI-generated insights from discussions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIModerator;
