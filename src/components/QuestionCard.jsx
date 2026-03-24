import { useNavigate } from "react-router-dom";

function QuestionCard({ question, onDelete }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/questions/${question.id}`)}
      className="bg-white p-5 rounded-xl shadow hover:shadow-md transition cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{question.title}</h3>
          <p className="text-gray-500 text-sm mt-1">{question.body}</p>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;