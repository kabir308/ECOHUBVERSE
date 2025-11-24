import React, { useState, useEffect } from 'react';

const Recommender = () => {
    const [recommendations, setRecommendations] = useState({
        products: [],
        articles: [],
        courses: []
    });
    const [selectedType, setSelectedType] = useState('products');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRecommendations(selectedType);
    }, [selectedType]);

    const fetchRecommendations = async (type) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/recommendations?type=${type}&userId=user123`);
            const data = await response.json();
            setRecommendations(prev => ({
                ...prev,
                [type]: data.recommendations || []
            }));
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderRecommendations = () => {
        const items = recommendations[selectedType] || [];
        
        if (loading) {
            return <div className="text-center py-4">Loading recommendations...</div>;
        }

        if (items.length === 0) {
            return <div className="text-center py-4">No recommendations available</div>;
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">
                                {item.name || item.title}
                            </h3>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                {Math.round(item.score * 100)}% match
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                            Category: {item.category}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-green-600 font-medium">
                                🌱 Eco-Friendly
                            </span>
                            <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition-colors">
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">🌿 Eco-Friendly Recommendations</h2>
                <p className="text-gray-600">AI-powered suggestions for sustainable living</p>
            </div>

            <div className="mb-6">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setSelectedType('products')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedType === 'products'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        🛍️ Products
                    </button>
                    <button
                        onClick={() => setSelectedType('articles')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedType === 'articles'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        📰 Articles
                    </button>
                    <button
                        onClick={() => setSelectedType('courses')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedType === 'courses'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        🎓 Courses
                    </button>
                </div>
            </div>

            {renderRecommendations()}
        </div>
    );
};

export default Recommender;
