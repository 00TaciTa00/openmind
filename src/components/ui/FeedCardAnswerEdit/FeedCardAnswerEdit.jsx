import { useParams } from "react-router";
import { useGetSubject } from "../../../data-access/subjects/useGetSubject";
import styles from "./FeedCardAnswerEdit.module.css";
import classNames from "classnames/bind";
import ButtonBox from "../ButtonBox/ButtonBox";
import { useState } from "react";
import { useGetAnswer } from "../../../data-access/answers/useGetAnswer";
// import usePatchAnswer from "../../../data-access/answers/usePatchAnswer";
import { getElapsedTime } from "../../../util/getElapsedTime";

const cx = classNames.bind(styles);

export default function FeedCardAnswerEdit({ answerId }) {
  // 사용자 명 가져오기
  const { id: subejctId } = useParams();
  const { data: subjectData } = useGetSubject(subejctId);
  const { name } = subjectData || {};
  // answer 있으면 가져오기
  const { data: answerData } = useGetAnswer(answerId || "");
  const { id, questionId, content, isRejected, createdAt } = answerData || {};
  const answer = answerData
    ? { id, questionId, content, isRejected, createdAt }
    : null;

  const answerContent = answer ? answer.content : "";

  // const { patchAnswerContent } = usePatchAnswer();
  const [editText, setEditText] = useState(answerContent); // useState로 초기 상태 설정
  const [isEmpty, setIsEmpty] = useState(answerContent ? false : true);

  const handleOnChange = (e) => {
    const textValue = e.target.value;
    setEditText(textValue);
    setIsEmpty(!textValue.trim());
  };

  const handleOnClick = () => {
    console.log(editText);
    console.log(answerId);
    console.log(answerContent);
    if (answer) {
      // patchAnswerContent(answerId, editText);
    } else {
      // usePostQuestionAnswers.js 사용
    }
  };

  return (
    <div className={cx("feedCardAnswer")}>
      <div className={cx("imgBox")} />
      <div className={cx("userAnswer")}>
        <div className={cx("userProfile")}>
          <span className={cx("userName")}>{name}</span>
          <span className={cx("userCreateDate")}>
            {answer && getElapsedTime(answer.createdAt)}
          </span>
        </div>
        <div className={cx("answerEdit")}>
          <textarea
            className={cx("answerInput")}
            value={editText} // 텍스트에 상태값을 설정해야 함
            onChange={handleOnChange} // 텍스트 입력이 발생할 때마다 상태 업데이트
            placeholder="답변을 입력해주세요."
            required
          />
          <ButtonBox
            text="수정 완료"
            qnaWidth="qnaWidth"
            qnaInactivate={isEmpty ? "qnaInactivate" : ""}
            onClick={handleOnClick}
          />
        </div>
      </div>
    </div>
  );
}
