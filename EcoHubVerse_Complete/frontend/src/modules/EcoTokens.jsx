import React, { useState, useEffect } from 'react';

const EcoTokens = () => {
    const [balance, setBalance] = useState(null);
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [transactionForm, setTransactionForm] = useState({
        toUser: '',
        amount: '',
        type: 'transfer'
    });
    const [transactionResult, setTransactionResult] = useState(null);

    // TODO: Replace with actual user authentication context
    const userId = 'user123'; // Demo user ID

    useEffect(() => {
        fetchBalance();
        fetchNFTs();
    }, []);

    const fetchBalance = async () => {
        try {
            const response = await fetch(`/api/ecotokens/balance/${userId}`);
            const data = await response.json();
            setBalance(data);
        } catch (error) {
            console.error('Error fetching balance:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchNFTs = async () => {
        try {
            const response = await fetch(`/api/nfts/green?userId=${userId}`);
            const data = await response.json();
            setNfts(data.nfts || []);
        } catch (error) {
            console.error('Error fetching NFTs:', error);
        }
    };

    const handleTransaction = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/ecotokens/transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fromUser: userId,
                    toUser: transactionForm.toUser,
                    amount: parseFloat(transactionForm.amount),
                    type: transactionForm.type
                })
            });
            const data = await response.json();
            setTransactionResult(data);
            setTransactionForm({ toUser: '', amount: '', type: 'transfer' });
            fetchBalance();
            
            setTimeout(() => setTransactionResult(null), 5000);
        } catch (error) {
            console.error('Error processing transaction:', error);
        }
    };

    const getLevelColor = (level) => {
        const colors = {
            'Bronze': 'from-orange-400 to-orange-600',
            'Silver': 'from-gray-300 to-gray-500',
            'Gold': 'from-yellow-400 to-yellow-600',
            'Platinum': 'from-purple-400 to-purple-600'
        };
        return colors[level] || 'from-gray-400 to-gray-600';
    };

    if (loading) {
        return <div className="p-6 text-center">Loading EcoTokens...</div>;
    }

    if (!balance) {
        return <div className="p-6 text-center">Unable to load EcoTokens data</div>;
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">💎 EcoTokens & Green NFTs</h2>
                <p className="text-gray-600">Sustainable blockchain for eco-conscious transactions</p>
            </div>

            {transactionResult && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    <p className="font-bold">Transaction Successful! 🎉</p>
                    <p className="text-sm">Transaction ID: {transactionResult.transactionId}</p>
                    <p className="text-sm">Carbon Saved: {transactionResult.carbonSaved} kg CO₂</p>
                </div>
            )}

            <div className={`bg-gradient-to-r ${getLevelColor(balance.level)} rounded-lg p-6 text-white mb-6`}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-sm opacity-90 mb-1">Your Balance</p>
                        <h3 className="text-4xl font-bold mb-2">{balance.balance} {balance.currency}</h3>
                        <p className="text-sm opacity-90">{balance.level} Level</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm opacity-90 mb-1">Carbon Offset</p>
                        <p className="text-2xl font-bold">{balance.carbonOffset} kg</p>
                        <p className="text-xs opacity-75">CO₂ neutralized</p>
                    </div>
                </div>
                <div className="border-t border-white border-opacity-30 pt-4">
                    <p className="text-sm opacity-90">
                        🌱 Every transaction plants virtual trees and offsets real carbon emissions
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">💸 Send EcoTokens</h3>
                    <form onSubmit={handleTransaction} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Recipient User ID</label>
                            <input
                                type="text"
                                value={transactionForm.toUser}
                                onChange={(e) => setTransactionForm({ ...transactionForm, toUser: e.target.value })}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="user456"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Amount (ECO)</label>
                            <input
                                type="number"
                                value={transactionForm.amount}
                                onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
                                className="w-full border rounded-lg px-4 py-2"
                                placeholder="10"
                                min="0.01"
                                step="0.01"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Transaction Type</label>
                            <select
                                value={transactionForm.type}
                                onChange={(e) => setTransactionForm({ ...transactionForm, type: e.target.value })}
                                className="w-full border rounded-lg px-4 py-2"
                            >
                                <option value="transfer">Transfer</option>
                                <option value="donation">Eco Donation</option>
                                <option value="purchase">Green Purchase</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                        >
                            Send Tokens
                        </button>
                    </form>
                </div>

                <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">📈 Token Benefits</h3>
                    <div className="space-y-3">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🌍</span>
                            <div>
                                <h4 className="font-semibold">Carbon Neutral</h4>
                                <p className="text-sm text-gray-600">Every transaction offsets carbon emissions</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">⚡</span>
                            <div>
                                <h4 className="font-semibold">Low Energy</h4>
                                <p className="text-sm text-gray-600">Uses sustainable blockchain technology</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">💰</span>
                            <div>
                                <h4 className="font-semibold">Earn Rewards</h4>
                                <p className="text-sm text-gray-600">Get tokens for eco-friendly actions</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🎁</span>
                            <div>
                                <h4 className="font-semibold">Exclusive Access</h4>
                                <p className="text-sm text-gray-600">Unlock premium eco-content and features</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold mb-4">🖼️ Your Green NFTs</h3>
                {nfts.length === 0 ? (
                    <div className="text-center py-8 border rounded-lg bg-gray-50">
                        <p className="text-gray-600">No NFTs yet. Complete eco-actions to earn your first NFT!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {nfts.map((nft) => (
                            <div key={nft.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg h-48 mb-4 flex items-center justify-center">
                                    <span className="text-6xl">🌿</span>
                                </div>
                                <h4 className="font-bold text-lg mb-2">{nft.name}</h4>
                                <p className="text-sm text-gray-600 mb-3">{nft.description}</p>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-green-600 font-medium">
                                        🌍 {nft.carbonImpact} tons CO₂
                                    </span>
                                    <span className="text-gray-500">
                                        {new Date(nft.mintDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="mt-3 pt-3 border-t">
                                    <p className="text-xs text-gray-500">NFT ID: {nft.id}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EcoTokens;
