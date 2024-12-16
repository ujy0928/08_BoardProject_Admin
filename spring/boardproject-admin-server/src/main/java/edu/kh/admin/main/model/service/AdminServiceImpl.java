package edu.kh.admin.main.model.service;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.admin.main.model.dto.Board;
import edu.kh.admin.main.model.dto.Member;
import edu.kh.admin.main.model.mapper.AdminMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor=Exception.class)
@Slf4j
public class AdminServiceImpl implements AdminService{

	private final AdminMapper mapper;
	private final BCryptPasswordEncoder bcrypt;
	
	// 관리자 로그인
	@Override
	public Member login(Member inputMember) {
		
		Member loginMember = mapper.login(inputMember.getMemberEmail());
		
		if(loginMember == null) return null;
		
		if(!bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw())) {
			return null;
		}
		
		loginMember.setMemberPw(null);
		
		return loginMember;
	}

	// 탈퇴한 회원 목록 조회
	@Override
	public List<Member> selectWithdrawnMemberList() {
		
		return mapper.selectWithdrawnMemberList();
	}

	// 탈퇴 회원 복구
	@Override
	public int restoreMember(int memberNo) {
		return mapper.restoreMember(memberNo);
	}

	// 삭제된 게시글 목록 조회
	@Override
	public List<Board> withdrawnBoardList() {
		return mapper.withdrawnBoardList();
	}

	// 삭제된 게시글 복구
	@Override
	public int restoreBoard(Board board) {
		return mapper.restoreBoard(board);
	}

	// 새로운 회원 조회
	@Override
	public List<Member> getNewMember() {
		
		return mapper.getNewMember();
	}

	// 최대 조회 게시글
	@Override
	public Board maxReadCount() {
		
		return mapper.maxReadCount();
	}

	// 최대 좋아요 수 게시글
	@Override
	public Board maxLikeCount() {
		
		return mapper.maxLikeCount();
	}

	@Override
	public Board maxCommentCount() {
		
		return mapper.maxCommentCount();
	}

}
