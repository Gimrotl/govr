import React, { useState } from 'react';
import { X, Star, Send, ThumbsUp, ThumbsDown, MessageCircle, Edit2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useModals } from '../../hooks/useModals';

interface RestStop {
  id: number;
  name: string;
  type: 'Raststätte' | 'Hotel' | 'Tankstelle' | 'Restaurant';
  location: string;
  address: string;
  rating: number;
  description: string;
  fullDescription: string;
  image: string;
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  replies: Reply[];
  userLiked?: boolean;
  userDisliked?: boolean;
}

interface Reply {
  id: number;
  userId: string;
  userName: string;
  comment: string;
  timestamp: string;
}

interface RestStopReviewsModalProps {
  restStop: RestStop;
  onClose: () => void;
}

export const RestStopReviewsModal: React.FC<RestStopReviewsModalProps> = ({ restStop, onClose }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [editingReply, setEditingReply] = useState<number | null>(null);
  const [editReplyText, setEditReplyText] = useState('');
  const { isLoggedIn, userEmail } = useAuth();
  const { openModal } = useModals();

  const handleSubmitReview = () => {
    if (!isLoggedIn) {
      alert('Sie müssen eingeloggt sein, um eine Bewertung abzugeben.');
      return;
    }
    
    if (!newReview.comment.trim()) {
      alert('Bitte geben Sie einen Kommentar ein.');
      return;
    }
    
    const review: Review = {
      id: Date.now(),
      userId: userEmail || '',
      userName: userEmail?.split('@')[0] || 'Benutzer',
      rating: newReview.rating,
      comment: newReview.comment,
      timestamp: new Date().toLocaleDateString('de-DE'),
      likes: 0,
      dislikes: 0,
      replies: []
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
  };

  const handleLike = (reviewId: number) => {
    if (!isLoggedIn) {
      alert('Sie müssen eingeloggt sein, um zu bewerten.');
      return;
    }
    
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        if (review.userLiked) {
          return { ...review, likes: review.likes - 1, userLiked: false };
        } else {
          return { 
            ...review, 
            likes: review.likes + 1, 
            dislikes: review.userDisliked ? review.dislikes - 1 : review.dislikes,
            userLiked: true, 
            userDisliked: false 
          };
        }
      }
      return review;
    }));
  };

  const handleDislike = (reviewId: number) => {
    if (!isLoggedIn) {
      alert('Sie müssen eingeloggt sein, um zu bewerten.');
      return;
    }
    
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        if (review.userDisliked) {
          return { ...review, dislikes: review.dislikes - 1, userDisliked: false };
        } else {
          return { 
            ...review, 
            dislikes: review.dislikes + 1,
            likes: review.userLiked ? review.likes - 1 : review.likes,
            userDisliked: true, 
            userLiked: false 
          };
        }
      }
      return review;
    }));
  };

  const handleReply = (reviewId: number) => {
    if (!isLoggedIn) {
      alert('Sie müssen eingeloggt sein, um zu antworten.');
      return;
    }
    
    if (!replyText.trim()) {
      alert('Bitte geben Sie eine Antwort ein.');
      return;
    }
    
    const reply: Reply = {
      id: Date.now(),
      userId: userEmail || '',
      userName: userEmail?.split('@')[0] || 'Benutzer',
      comment: replyText,
      timestamp: new Date().toLocaleDateString('de-DE')
    };
    
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        return { ...review, replies: [...review.replies, reply] };
      }
      return review;
    }));
    
    setReplyText('');
    setReplyingTo(null);
    alert('Antwort erfolgreich abgegeben!');
  };

  const handleEditReply = (replyId: number) => {
    if (!editReplyText.trim()) {
      alert('Bitte geben Sie eine Antwort ein.');
      return;
    }
    
    setReviews(reviews.map(review => ({
      ...review,
      replies: review.replies.map(reply => 
        reply.id === replyId 
          ? { ...reply, comment: editReplyText }
          : reply
      )
    })));
    
    setEditingReply(null);
    setEditReplyText('');
    alert('Antwort erfolgreich bearbeitet!');
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : restStop.rating;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60] p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Bewertungen für {restStop.name}
            </h2>
            <div className="flex items-center mt-2">
              <div className="flex items-center mr-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={`${
                      star <= Math.floor(averageRating)
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xl font-bold text-gray-800 mr-2">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-gray-600">
                ({reviews.length} {reviews.length === 1 ? 'Bewertung' : 'Bewertungen'})
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition duration-200 bg-red-50 rounded-full p-2"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col h-[calc(90vh-120px)]">
          {/* Reviews List */}
          <div className="flex-1 p-6 overflow-y-auto">
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <Star size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg">Noch keine Bewertungen</p>
                <p className="text-gray-400 text-sm mt-2">
                  Seien Sie der Erste, der {restStop.name} bewertet!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-start space-x-4">
                      {/* User Avatar */}
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">
                          {review.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      
                      {/* Review Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800 text-lg">
                            {review.userName}
                          </h4>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={`${
                                  star <= review.rating
                                    ? 'text-yellow-500 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-2 font-bold text-gray-700">
                              {review.rating}.0
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed mb-3">
                          {review.comment}
                        </p>
                        
                        {/* Action buttons */}
                        <div className="flex items-center space-x-4 text-sm">
                          <button
                            onClick={() => handleLike(review.id)}
                            className={`flex items-center space-x-1 transition-colors ${
                              review.userLiked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                            }`}
                          >
                            <ThumbsUp size={16} />
                            <span>{review.likes}</span>
                          </button>
                          
                          <button
                            onClick={() => handleDislike(review.id)}
                            className={`flex items-center space-x-1 transition-colors ${
                              review.userDisliked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                            }`}
                          >
                            <ThumbsDown size={16} />
                            <span>{review.dislikes}</span>
                          </button>
                          
                          <button
                            onClick={() => setReplyingTo(review.id)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors"
                          >
                            <MessageCircle size={16} />
                            <span>Antworten</span>
                          </button>
                          
                          <span className="text-gray-400">{review.timestamp}</span>
                        </div>
                        
                        {/* Replies */}
                        {review.replies.length > 0 && (
                          <div className="mt-4 space-y-3 border-l-2 border-gray-200 pl-4">
                            {review.replies.map((reply) => (
                              <div key={reply.id} className="bg-white rounded-lg p-3 border border-gray-100">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2">
                                      <span className="text-white font-bold text-sm">
                                        {reply.userName.charAt(0).toUpperCase()}
                                      </span>
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-800 text-sm">{reply.userName}</p>
                                      <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                    </div>
                                  </div>
                                  {reply.userId === userEmail && (
                                    <button
                                      onClick={() => {
                                        setEditingReply(reply.id);
                                        setEditReplyText(reply.comment);
                                      }}
                                      className="text-gray-400 hover:text-blue-600 transition-colors"
                                    >
                                      <Edit2 size={14} />
                                    </button>
                                  )}
                                </div>
                                
                                {editingReply === reply.id ? (
                                  <div className="space-y-2">
                                    <textarea
                                      value={editReplyText}
                                      onChange={(e) => setEditReplyText(e.target.value)}
                                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-16 text-sm"
                                    />
                                    <div className="flex space-x-2">
                                      <button
                                        onClick={() => handleEditReply(reply.id)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-200 text-sm"
                                      >
                                        Speichern
                                      </button>
                                      <button
                                        onClick={() => {
                                          setEditingReply(null);
                                          setEditReplyText('');
                                        }}
                                        className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition duration-200 text-sm"
                                      >
                                        Abbrechen
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-gray-700 text-sm">{reply.comment}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Reply form */}
                        {replyingTo === review.id && (
                          <div className="mt-4 space-y-3 border-l-2 border-green-200 pl-4">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Ihre Antwort..."
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none h-20 text-sm"
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleReply(review.id)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 flex items-center text-sm"
                              >
                                <Send size={14} className="mr-2" />
                                Antworten
                              </button>
                              <button
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText('');
                                }}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200 text-sm"
                              >
                                Abbrechen
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Review Form at Bottom */}
          <div className="border-t border-gray-200 bg-gray-50 p-3">
            <h3 className="text-base font-semibold text-gray-800 mb-2">Bewertung abgeben</h3>
            
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
                  <div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="transition-colors"
                        >
                          <Star
                            size={18}
                            className={`${
                              star <= newReview.rating
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300'
                            } hover:text-yellow-400`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex space-x-2">
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        placeholder="Teilen Sie Ihre Erfahrung mit..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-8 text-xs"
                      />
                      <button
                        onClick={handleSubmitReview}
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg font-medium hover:bg-blue-700 transition duration-200 flex items-center justify-center h-8 text-xs"
                      >
                        <Send size={12} className="mr-1" />
                        Senden
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <Star size={32} className="mx-auto mb-2 text-gray-300" />
                <p className="text-gray-500 mb-2 text-sm">
                  Melden Sie sich an, um eine Bewertung abzugeben
                </p>
                <button
                  onClick={() => {
                    openModal('login');
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium text-sm"
                >
                  Anmelden
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};