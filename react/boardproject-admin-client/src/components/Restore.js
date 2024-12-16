import React, { useEffect, useState } from "react";
import { axiosApi } from './../api/axiosAPI';

export default function Restore() {
  const [withdrawnMembers, setWithDrawnMembers] = useState([]); // 탈퇴 회원 목록
  const [deleteBoards, setDeleteBoards] = useState([]); // 삭제 게시글 목록

  const [loading, setLoading] = useState(true); // 로딩 상태

  // 탈퇴한 회원 목록 조회용 비동기 요청 함수
  const getWithdrawnMemberList = async() => {
    try {
      const resp = await axiosApi.get("/admin/withdrawnMemberList");

      if(resp.status === 200) {
        setWithDrawnMembers(resp.data);
      }
    } catch(error) {
      console.log("탈퇴 회원 목록 조회 중 에러 발생 : " + error);
    }
  }

  // 탈퇴한 회원 복구 비동기 요청 함수
  const restoreMember = async (member) => {
    if(window.confirm(member.memberNickname + "님을 탈퇴 복구 시키겠습니까?")) {
      try {
        const response = await axiosApi.put("/admin/restoreMember", {memberNo : member.memberNo});
        //console.log(response);

        if(response.status === 200) {
          alert("복구 되었습니다");
          getWithdrawnMemberList();
        }
      } catch(error) { 
        console.log(error);
      }
    }
  }

  //-------------

  // 삭제한 게시글 목록 조회용 비동기 요청 함수
  const getDeleteBoardList = async() => {
    try { 
      const response = await axiosApi.get("/admin/withdrawnBoardList");
      //console.log(response);
      if(response.status === 200) {
        setDeleteBoards(response.data);
      }
    } catch(error) {
      console.log(error);
    }
  }

  // 삭제한 게시글 복구 비동기 요청 함수
  const restoreBoard = async (board) => {
    if(window.confirm(board.boardTitle + "게시글을 복구 하시겠습니까?")) {
      try {
        const response = await axiosApi.put("/admin/restoreBoard", {boardNo : board.boardNo});
        console.log(response);

        if(response.status === 200) {
          alert("복구 되었습니다");
          getDeleteBoardList();
        }
      } catch(error) { 
        console.log(error);
      }
    }
  }


  /*
    useEffect : React의 함수형 컴포넌트에서 특정 작업(side effect(==부수 효과))을 처리하기 위해 사용하는 Hook
    컴포넌트가 렌더링 되거나 상태가 변경될 때 실행되는 작업을 정의할 수 있다.
  
    useEffect(() => {
      // 실행할 작업(side effect)
    }, [의존성 배열]);

    // 두번째 인자로 전달된 배열([])은 의존성 배열(Dependency Array)임
    // 의존성 배열은 이 useEffect가 언제 실행될지를 결정함.
    // -> 의존성 배열이 빈 배열일 겨우, 이 useEffect는 컴포넌트가 처음 렌더링 될 떄 딱 한번만 실행

  */

  // Restore 컴포넌트가 처음 렌더링 될 떄 getWithdrawnMemberList, getDeleteBoardList 함수를 실행
  useEffect(() => {
    getWithdrawnMemberList();
    getDeleteBoardList();
  }, []);

  // withdrawnMembers 또는 deleteBoards 상태가 변경될 때마다 실행
  useEffect(() => {
    if(withdrawnMembers != null && deleteBoards != null) {
      setLoading(false);
    }
  }, [withdrawnMembers, deleteBoards]);

  if(loading) {
    return <h1>Loading...</h1>
  } else {
    return (
      <div className="menu-box">
        <RestoreMember withdrawnMembers={withdrawnMembers} restoreMember={restoreMember}/>
        <RestoreBoard deleteBoards={deleteBoards} restoreBoard={restoreBoard}/>
      </div>
    );
  }
  
}


const RestoreMember = ({withdrawnMembers, restoreMember}) => {
  return (
    <section className="section-border">
      <h2>탈퇴 회원 복구</h2>

      <h3>탈퇴한 회원 목록</h3>

      {
        withdrawnMembers.length === 0 ?
        (<p>탈퇴한 회원이 없습니다</p>) : 
        (withdrawnMembers.map((member, index) => {
          return (
            <ul className="ul-border" key={index}>
              <li>회원 번호 : {member.memberNo}</li>
              <li>회원 이메일 : {member.memberEmail}</li>
              <li>회원 닉네임 : {member.memberNickname}</li>
              <button className="restoreBtn" onClick={() => restoreMember(member)}>복구</button>
            </ul>
          )
        })
      )
      }

    </section>
  );
}

const RestoreBoard = ({deleteBoards, restoreBoard}) => {

  return (
    <section className="section-border">
      <h2>삭제 게시글 복구</h2>

      <h3>삭제된 게시글 목록</h3>
      {
        deleteBoards.length === 0 ?
        (<p>삭제된 게시글이 없습니다</p>) : 
        (deleteBoards.map((board, index) => {
          return (
            <ul className="ul-border" key={index}>
              <li>게시글 번호 : {board.boardNo}</li>
              <li>게시글 카테고리 : {board.boardName}</li>
              <li>게시글 제목 : {board.boardTitle}</li>
              <li>작성자 닉네임 : {board.memberNickname}</li>
              <button className="restoreBtn" onClick={() => restoreBoard(board)}>복구</button>
            </ul>
          )
        })
      )
      }
    </section>
  );
}