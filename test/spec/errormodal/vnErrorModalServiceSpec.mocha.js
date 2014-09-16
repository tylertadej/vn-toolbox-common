/**
 * @module test.Volusion.toolboxCommon
 * @name vnErrorModalService
 * @description
 * Tests for vnErrorModalService under volusion.toolboxCommon
 * to ensure that it opens the modal window with the
 * default template url or the template url passed in.
 * */


describe('Service: Volusion.toolboxCommon.vnModalService', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var service, $modal, modalOpenSpy, $rootScope;

    //update the injection
    beforeEach(inject(function (vnModalService, _$modal_, _$rootScope_) {
        service = vnModalService;
        $modal = _$modal_;
		$rootScope = _$rootScope_;

        modalOpenSpy = sinon.spy($modal, 'open');
    }));


    afterEach(function() {
        $modal.open.restore();
    });

    it('should be injected and defined', function () {
        expect(service).to.exist;
    });

    it('calls opens modal error dialog with passed in template', function() {

		var messageScope = $rootScope.$new(true);
		messageScope.exceptionCode = '500';
		messageScope.exceptionMessage = 'Server error message goes here';

        service.showError('foo/bar', messageScope);
        expect(modalOpenSpy).to.have.been.calledWithExactly({
            templateUrl: 'foo/bar',
			scope: messageScope
        });
    });

    it('calls opens the modal error dialog with default template if nothing is passed in', function() {

        service.showError();
        expect(modalOpenSpy).to.have.been.calledWithExactly({
            templateUrl: 'modal/vnErrorModal.tpl.html',
			scope: undefined
        });
    });

	it('calls opens modal message dialog with passed in template', function() {

		var messageScope = $rootScope.$new(true);
		messageScope.messageBool = true;
		messageScope.messageString = 'String value goes here';

		service.showMessage('foo/bar', messageScope);
		expect(modalOpenSpy).to.have.been.calledWithExactly({
			templateUrl: 'foo/bar',
			scope: messageScope
		});
	});

	it('calls opens the modal message dialog with default template if nothing is passed in', function() {

		service.showMessage();
		expect(modalOpenSpy).to.have.been.calledWithExactly({
			templateUrl: 'modal/vnModalMessage.tpl.html',
			scope: undefined
		});
	});
});
