import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { privateEncrypt } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Converts a string to a hashed string
 * @param {string} str_to_hash the string to be hashed
 * @returns {Promise<string>} the hashed string
 */
export async function hashString(strToHash) {
  try {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(strToHash, saltRounds);
    return hashed;
  } catch (err) {
    throw new Error('Provided password can not be used');
  }
}

/**
 * Check if a string matches an hashed string
 * @param {string} stringToCheck The string to be compared (unhashed)
 * @param {string} hashedString The hashed to string to be used for comparison
 * @returns {Promise<boolean>} true if it's a match else false
 */
export async function hashMatch(stringToCheck, hashedString) {
  return await bcrypt.compare(stringToCheck, hashedString);
}

/**
 * Creates a token
 * @param {object} payload data to be stored in the token
 * @returns the token string
 */
export function createToken(payload) {
  const privateKey = process.env['SECRET_KEY'];
  if (!privateKey) {
    throw Error('No SECRET_KEY environment variable set');
  }
  const token = jwt.sign(payload, `${privateKey}`, { expiresIn: '2h' });
  return token;
}

/**
 * Verifies active user's access token and returns the payload
 * @param {string} token session access token
 * @returns {object} a object that contains the active user's hash code (or empty string if token is invalid)
 */
export function getSessionPayload(token) {
  let payload = {user_hash: ''};
  const privateKey = process.env['SECRET_KEY'];
  if (!privateKey) {
    throw Error('No SECRET_KEY environment variable set');
  }
  try {
    payload = jwt.verify(token, `${privateKey}`);
  } catch (err) { 
    // Session expired or doesn't match
    // Do nothing
  }
  return payload;
}

/**
 * Retrieves the active user's hash code
 * @param {import('express').Request} req express request object
 * @returns {string} The active user's unique hash code
 */
export function getUserHashFromSession(req) {
  const token = req.header('X-Access-Token');
  const payload = getSessionPayload(token);
  return payload.user_hash;
}

export function removeTrailingSlash(url) {
  let clean_str = url;
  const lastIndex = url.length - 1;
  if (url[lastIndex] === '/') {
    clean_str =  clean_str.slice(0, lastIndex);
  }
  return clean_str;
}