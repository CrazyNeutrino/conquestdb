package org.meb.conquest.service;

import java.nio.ByteBuffer;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.SecureRandom;
import java.security.Security;

import lombok.Getter;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

public class HashHelper {

	private static final int SALT_SIZE = 64;

	private byte[] password;

	@Getter
	private String hashHex;

	@Getter
	private String saltHex;

	static {
		Security.addProvider(new BouncyCastleProvider());
	}

	public HashHelper(String password) {
		this.password = password.trim().getBytes();
	}

	public HashHelper create() {
		byte[] salt = createSalt();
		saltHex = new String(Hex.encodeHex(salt));
		hashHex = new String(Hex.encodeHex(createHash(salt, true)));
		return this;
	}

	public boolean verify(String hashHex, String saltHex) {
		try {
			byte[] newHash = createHash(Hex.decodeHex(saltHex.toCharArray()), false);
			String newHashHex = new String(Hex.encodeHex(newHash));
			return newHashHex.equals(hashHex);
		} catch (DecoderException e) {
			throw new RuntimeException(e);
		}
	}

	public boolean verify() {
		return verify(hashHex, saltHex);
	}

	private byte[] createSalt() {
		byte[] seed = Long.toString(System.currentTimeMillis()).getBytes();
		byte[] salt = new byte[SALT_SIZE];
		SecureRandom random = new SecureRandom(seed);
		random.nextBytes(salt);
		return salt;
	}

	private byte[] createHash(byte[] salt, boolean forceLongPassword) {
		if (salt == null || salt.length < 20) {
			throw new RuntimeException("Invalid salt");
		}
		if (forceLongPassword && (password == null || password.length < 8)) {
			throw new RuntimeException("Invalid password");
		}

		ByteBuffer data = ByteBuffer.allocate(salt.length + password.length);
		data.put(salt).put(password);
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-512", "BC");
			byte[] hash = md.digest(data.array());
			return hash;
		} catch (NoSuchAlgorithmException | NoSuchProviderException e) {
			throw new RuntimeException("Unable to hash password", e);
		}
	}
}
