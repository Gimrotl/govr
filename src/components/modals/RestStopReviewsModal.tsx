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

        <div className="flex flex-col h-[calc(90vh-180px)]">
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
              <div className="space-y-3 md:space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 rounded-xl p-3 md:p-4 border border-gray-200">
                    <div className="flex items-start space-x-2 md:space-x-4">
                      {/* User Avatar */}
                      <div className="w-8 h-8 md:w-12 md:h-12 bg-sky-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm md:text-lg">
                          {review.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      {/* Review Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1 md:mb-2">
                          <h4 className="font-semibold text-gray-800 text-sm md:text-lg truncate">
                            {review.userName}
                          </h4>
                          <div className="flex items-center flex-shrink-0 ml-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                className={`md:w-4 md:h-4 ${
                                  star <= review.rating
                                    ? 'text-yellow-500 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-1 md:ml-2 font-bold text-gray-700 text-xs md:text-base">
                              {review.rating}.0
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-2 md:mb-3 text-xs md:text-base break-words">
                          {review.comment}
                        </p>

                        {/* Action buttons */}
                        <div className="flex items-center flex-wrap gap-2 md:gap-4 text-xs md:text-sm">
                          <button
                            onClick={() => handleLike(review.id)}
                            className={`flex items-center space-x-1 transition-colors ${
                              review.userLiked ? 'text-sky-500' : 'text-gray-500 hover:text-sky-500'
                            }`}
                          >
                            <ThumbsUp className="w-3 h-3 md:w-4 md:h-4" />
                            <span>{review.likes}</span>
                          </button>

                          <button
                            onClick={() => handleDislike(review.id)}
                            className={`flex items-center space-x-1 transition-colors ${
                              review.userDisliked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                            }`}
                          >
                            <ThumbsDown className="w-3 h-3 md:w-4 md:h-4" />
                            <span>{review.dislikes}</span>
                          </button>

                          <button
                            onClick={() => setReplyingTo(review.id)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-emerald-500 transition-colors"
                          >
                            <MessageCircle className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="hidden sm:inline">Antworten</span>
                          </button>

                          <span className="text-gray-400 text-[10px] md:text-xs">{review.timestamp}</span>
                        </div>
                        
                        {/* Replies */}
                        {review.replies.length > 0 && (
                          <div className="mt-2 md:mt-4 space-y-2 md:space-y-3 border-l-2 border-gray-200 pl-2 md:pl-4">
                            {review.replies.map((reply) => (
                              <div key={reply.id} className="bg-white rounded-lg p-2 md:p-3 border border-gray-100">
                                <div className="flex items-start justify-between mb-1 md:mb-2">
                                  <div className="flex items-center min-w-0">
                                    <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center mr-1.5 md:mr-2 flex-shrink-0">
                                      <span className="text-white font-bold text-xs md:text-sm">
                                        {reply.userName.charAt(0).toUpperCase()}
                                      </span>
                                    </div>
                                    <div className="min-w-0">
                                      <p className="font-medium text-gray-800 text-xs md:text-sm truncate">{reply.userName}</p>
                                      <span className="text-[10px] md:text-xs text-gray-500">{reply.timestamp}</span>
                                    </div>
                                  </div>
                                  {reply.userId === userEmail && (
                                    <button
                                      onClick={() => {
                                        setEditingReply(reply.id);
                                        setEditReplyText(reply.comment);
                                      }}
                                      className="text-gray-400 hover:text-sky-500 transition-colors flex-shrink-0 ml-2"
                                    >
                                      <Edit2 className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                    </button>
                                  )}
                                </div>
                                
                                {editingReply === reply.id ? (
                                  <div className="space-y-1.5 md:space-y-2">
                                    <textarea
                                      value={editReplyText}
                                      onChange={(e) => setEditReplyText(e.target.value)}
                                      className="w-full p-1.5 md:p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none h-12 md:h-16 text-xs md:text-sm"
                                    />
                                    <div className="flex space-x-1.5 md:space-x-2">
                                      <button
                                        onClick={() => handleEditReply(reply.id)}
                                        className="bg-sky-500 text-white px-2 md:px-3 py-1 rounded-md hover:bg-sky-600 transition duration-200 text-xs md:text-sm"
                                      >
                                        Speichern
                                      </button>
                                      <button
                                        onClick={() => {
                                          setEditingReply(null);
                                          setEditReplyText('');
                                        }}
                                        className="bg-gray-500 text-white px-2 md:px-3 py-1 rounded-md hover:bg-gray-600 transition duration-200 text-xs md:text-sm"
                                      >
                                        Abbrechen
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-gray-700 text-xs md:text-sm break-words">{reply.comment}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Reply form */}
                        {replyingTo === review.id && (
                          <div className="mt-2 md:mt-4 space-y-2 md:space-y-3 border-l-2 border-emerald-200 pl-2 md:pl-4">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Ihre Antwort..."
                              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none h-16 md:h-20 text-xs md:text-sm"
                            />
                            <div className="flex space-x-1.5 md:space-x-2">
                              <button
                                onClick={() => handleReply(review.id)}
                                className="bg-emerald-500 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-emerald-600 transition duration-200 flex items-center text-xs md:text-sm"
                              >
                                <Send className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1 md:mr-2" />
                                Antworten
                              </button>
                              <button
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText('');
                                }}
                                className="bg-gray-500 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-gray-600 transition duration-200 text-xs md:text-sm"
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
          <div className="border-t border-gray-200 bg-gray-50 p-2 md:p-3">
            <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-1.5 md:mb-2">Bewertung abgeben</h3>

            {isLoggedIn ? (
              <div className="space-y-1.5 md:space-y-2">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-1.5 md:space-y-0">
                  <div>
                    <div className="flex space-x-0.5 md:space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="transition-colors"
                        >
                          <Star
                            className={`w-4 h-4 md:w-[18px] md:h-[18px] ${
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
                    <div className="flex space-x-1.5 md:space-x-2">
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        placeholder="Teilen Sie Ihre Erfahrung mit..."
                        className="flex-1 p-1.5 md:p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none h-8 text-[11px] md:text-xs"
                      />
                      <button
                        onClick={handleSubmitReview}
                        className="bg-sky-500 text-white px-2 md:px-3 py-1 rounded-lg font-medium hover:bg-sky-600 transition duration-200 flex items-center justify-center h-8 text-[11px] md:text-xs whitespace-nowrap"
                      >
                        <Send className="w-3 h-3 md:w-3 md:h-3 mr-0.5 md:mr-1" />
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
                  className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition duration-200 font-medium text-sm"
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