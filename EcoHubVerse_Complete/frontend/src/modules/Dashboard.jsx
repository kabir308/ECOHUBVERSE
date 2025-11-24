import React, { useState } from 'react';
import Blog from './Blog.jsx';
import Chat from './Chat.jsx';
import Crypto from './Crypto.jsx';
import Ecommerce from './Ecommerce.jsx';
import Elearning from './Elearning.jsx';
import Recommender from './Recommender.jsx';
import Gamification from './Gamification.jsx';
import EcoTokens from './EcoTokens.jsx';
import AIModerator from './AIModerator.jsx';

const Dashboard = () => {
    const [activeModule, setActiveModule] = useState('dashboard');

    const renderModule = () => {
        switch (activeModule) {
            case 'blog':
                return <Blog />;
            case 'chat':
                return <Chat />;
            case 'crypto':
                return <Crypto />;
            case 'ecommerce':
                return <Ecommerce />;
            case 'elearning':
                return <Elearning />;
            case 'recommender':
                return <Recommender />;
            case 'gamification':
                return <Gamification />;
            case 'ecotokens':
                return <EcoTokens />;
            case 'aimoderator':
                return <AIModerator />;
            default:
                return (
                    <div className="p-6">
                        <h2 className="text-3xl font-bold mb-4">🌿 Welcome to EcoHubVerse</h2>
                        <p className="text-gray-600 mb-6">
                            Your central hub for eco-conscious living, learning, and community engagement.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => setActiveModule('recommender')}>
                                <h3 className="text-xl font-bold mb-2">🎯 AI Recommender</h3>
                                <p className="text-gray-600 text-sm">
                                    Get personalized eco-friendly product, article, and course recommendations
                                </p>
                            </div>

                            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => setActiveModule('ecotokens')}>
                                <h3 className="text-xl font-bold mb-2">💎 EcoTokens</h3>
                                <p className="text-gray-600 text-sm">
                                    Sustainable blockchain tokens and Green NFTs for eco-transactions
                                </p>
                            </div>

                            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => setActiveModule('gamification')}>
                                <h3 className="text-xl font-bold mb-2">🎮 Gamification</h3>
                                <p className="text-gray-600 text-sm">
                                    Earn points, badges, and levels for your eco-friendly actions
                                </p>
                            </div>

                            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => setActiveModule('aimoderator')}>
                                <h3 className="text-xl font-bold mb-2">🤖 AI Moderator</h3>
                                <p className="text-gray-600 text-sm">
                                    Intelligent community moderation and content insights
                                </p>
                            </div>

                            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => setActiveModule('ecommerce')}>
                                <h3 className="text-xl font-bold mb-2">🛍️ Eco-Commerce</h3>
                                <p className="text-gray-600 text-sm">
                                    Shop sustainable and eco-friendly products
                                </p>
                            </div>

                            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => setActiveModule('elearning')}>
                                <h3 className="text-xl font-bold mb-2">🎓 E-Learning</h3>
                                <p className="text-gray-600 text-sm">
                                    Learn about sustainability and environmental practices
                                </p>
                            </div>

                            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => setActiveModule('blog')}>
                                <h3 className="text-xl font-bold mb-2">📰 Blog</h3>
                                <p className="text-gray-600 text-sm">
                                    Read and share articles on environmental topics
                                </p>
                            </div>

                            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => setActiveModule('chat')}>
                                <h3 className="text-xl font-bold mb-2">💬 Community Chat</h3>
                                <p className="text-gray-600 text-sm">
                                    Connect with like-minded eco-conscious individuals
                                </p>
                            </div>

                            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => setActiveModule('crypto')}>
                                <h3 className="text-xl font-bold mb-2">₿ Crypto Info</h3>
                                <p className="text-gray-600 text-sm">
                                    Learn about eco-friendly cryptocurrencies
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                            <h3 className="text-xl font-bold mb-3">✨ New Features</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>AI-powered recommendations for sustainable products and content</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Green NFTs and EcoTokens for carbon-neutral transactions</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>Gamification system with points, badges, and achievements</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span>AI-moderated community with intelligent content filtering</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-green-600 text-white shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold cursor-pointer" onClick={() => setActiveModule('dashboard')}>
                                🌍 EcoHubVerse
                            </h1>
                        </div>
                        <div className="hidden md:flex space-x-1">
                            <button
                                onClick={() => setActiveModule('dashboard')}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    activeModule === 'dashboard' ? 'bg-green-700' : 'hover:bg-green-700'
                                }`}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => setActiveModule('recommender')}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    activeModule === 'recommender' ? 'bg-green-700' : 'hover:bg-green-700'
                                }`}
                            >
                                Recommender
                            </button>
                            <button
                                onClick={() => setActiveModule('ecotokens')}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    activeModule === 'ecotokens' ? 'bg-green-700' : 'hover:bg-green-700'
                                }`}
                            >
                                EcoTokens
                            </button>
                            <button
                                onClick={() => setActiveModule('gamification')}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    activeModule === 'gamification' ? 'bg-green-700' : 'hover:bg-green-700'
                                }`}
                            >
                                Gamification
                            </button>
                            <button
                                onClick={() => setActiveModule('aimoderator')}
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    activeModule === 'aimoderator' ? 'bg-green-700' : 'hover:bg-green-700'
                                }`}
                            >
                                AI Moderator
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main>
                {renderModule()}
            </main>
        </div>
    );
};

export default Dashboard;
