package org.meb.conquest.db.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cqt_user_session")
public class UserSession {

	@NonNull
	private String sessionId;
	private Date startDate;
	private Date endDate;
	private String userAgent;
	private String userIp;
	
	@Id
	private Long id;
	
	@Version
	private Long version;
}
