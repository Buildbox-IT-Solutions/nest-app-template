import { describe, expect, it, beforeEach } from 'vitest';

import { Email } from '../../value-objects/email/email.value-object';
import { Id } from '../../value-objects/id/id.value-object';
import { UserEntity } from './user.entity';

describe('UserEntity', () => {
  let userEntity: UserEntity;
  let mockDate: Date;
  let mockId: Id;
  let mockEmail: Email;

  beforeEach(() => {
    mockDate = new Date();
    mockId = new Id();
    mockEmail = new Email('test@example.com');

    userEntity = new UserEntity({
      id: mockId.value,
      name: 'John Doe',
      email: mockEmail.value,
      createdAt: mockDate,
      updatedAt: mockDate,
      deletedAt: undefined,
    });
  });

  describe('constructor', () => {
    it('should create an instance with provided values', () => {
      expect(userEntity.id.value).toBe(mockId.value);
      expect(userEntity.name).toBe('John Doe');
      expect(userEntity.email.value).toBe(mockEmail.value);
      expect(userEntity.createdAt).toBe(mockDate);
      expect(userEntity.updatedAt).toBe(mockDate);
      expect(userEntity.deletedAt).toBeNull();
    });

    it('should create an instance with default values when minimal parameters are provided', () => {
      const entity = new UserEntity({
        name: 'Jane Smith',
        email: 'jane@example.com',
      });

      expect(entity.id).toBeInstanceOf(Id);
      expect(entity.name).toBe('Jane Smith');
      expect(entity.email).toBeInstanceOf(Email);
      expect(entity.email.value).toBe('jane@example.com');
      expect(entity.createdAt).toBeInstanceOf(Date);
      expect(entity.updatedAt).toBeInstanceOf(Date);
      expect(entity.deletedAt).toBeNull();
    });
  });

  describe('getters', () => {
    it('should get name correctly', () => {
      expect(userEntity.name).toBe('John Doe');
    });

    it('should get email correctly', () => {
      expect(userEntity.email.value).toBe(mockEmail.value);
    });

    it('should get id correctly', () => {
      expect(userEntity.id.value).toBe(mockId.value);
    });

    it('should get createdAt correctly', () => {
      expect(userEntity.createdAt).toBe(mockDate);
    });

    it('should get updatedAt correctly', () => {
      expect(userEntity.updatedAt).toBe(mockDate);
    });

    it('should get deletedAt correctly', () => {
      expect(userEntity.deletedAt).toBeNull();
    });
  });

  describe('changeEmail', () => {
    it('should change email successfully', () => {
      const newEmail = 'newemail@example.com';
      userEntity.changeEmail(newEmail);

      expect(userEntity.email).toBeInstanceOf(Email);
      expect(userEntity.email.value).toBe(newEmail);
    });

    it('should change email with valid email format', () => {
      const validEmails = [
        'user@domain.com',
        'user.name@domain.co.uk',
        'user+tag@domain.org',
        '123@domain.net',
      ];

      validEmails.forEach((email) => {
        userEntity.changeEmail(email);
        expect(userEntity.email.value).toBe(email);
      });
    });

    it('should throw error when changing to invalid email', () => {
      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        'user.domain.com',
        '',
        '   ',
      ];

      invalidEmails.forEach((email) => {
        expect(() => {
          userEntity.changeEmail(email);
        }).toThrow();
      });
    });
  });
});
