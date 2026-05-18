import { useNavigate } from "react-router-dom";

function QuestionCard({ question, onDelete }) {
  const navigate = useNavigate();
  const authorInitial = question.author?.charAt(0).toUpperCase() || "?";

  return (
    <div
      onClick={() => navigate(`/questions/${question.id}`)}
      className="bg-white p-5 rounded-xl shadow hover:shadow-md transition cursor-pointer"
    >
      <div className="flex gap-4">
        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
          {question.author_profile_picture ? (
            <img
              src={question.author_profile_picture}
              alt={`${question.author}'s profile`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-blue-600">{authorInitial}</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <span className="font-medium text-gray-500">{question.author || "Unknown"}</span>
            {question.tag && (
              <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{question.tag}</span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{question.title}</h3>
          <p className="text-gray-500 text-sm mt-1">{question.body}</p>
          <div className="flex gap-4 text-xs text-gray-400 mt-3">
            <span>{question.votes} votes</span>
            <span>{question.answers} answers</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
