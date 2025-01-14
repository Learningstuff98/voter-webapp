'use strict';

function mockAuthService() {
  return {
    isAuthenticated() {
      return 'authService.isAuthenticated';
    },
    hasGlobalRole(role) {
      return `authService.hasGlobalRole.${role}`;
    }
  };
}
function mockUserCtrl() {
  return {
    index: 'userCtrl.index',
    destroy: 'userCtrl.destroy',
    me: 'userCtrl.me',
    changePassword: 'userCtrl.changePassword',
    show: 'userCtrl.show',
    create: 'userCtrl.create'
  };
}

function mockRouter() {
  return {
    Router() {
      return {
        get: jest.fn(),
        put: jest.fn(),
        patch: jest.fn(),
        post: jest.fn(),
        delete: jest.fn()
      };
    }
  };
}

// require the index with our stubbed out modules
jest.mock('express', () => mockRouter());
jest.mock('./user.controller.js', () => mockUserCtrl());
jest.mock('../../auth/auth.service', () => mockAuthService());

var userIndex = require('./user.controller.js');

describe('User API Router:', function() {
  it('should return an express router instance', function() {
    expect(userIndex).toEqual(mockUserCtrl());
  });
/*
  describe('GET /api/users', function() {
    it('should verify admin role and route to user.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'authService.hasGlobalRole.admin', 'userCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/users/:id', function() {
    it('should verify admin role and route to user.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'authService.hasGlobalRole.admin', 'userCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/users/me', function() {
    it('should be authenticated and route to user.controller.me', function() {
      expect(routerStub.get
        .withArgs('/me', 'authService.isAuthenticated', 'userCtrl.me')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/users/:id/password', function() {
    it('should be authenticated and route to user.controller.changePassword', function() {
      expect(routerStub.put
        .withArgs('/:id/password', 'authService.isAuthenticated', 'userCtrl.changePassword')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/users/:id', function() {
    it('should be authenticated and route to user.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'userCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/users', function() {
    it('should route to user.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'userCtrl.create')
        ).to.have.been.calledOnce;
    });
  });*/
});
