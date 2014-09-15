/**
 * @module test.Volusion.toolboxCommon
 * @name vnErrorModalService
 * @description
 * Tests for vnErrorModalService under volusion.toolboxCommon
 * to ensure that it opens the modal window with the
 * default template url or the template url passed in.
 * */


describe('Service: Volusion.toolboxCommon.vnErrorModalService', function () {

    // load the service's module
    beforeEach(module('Volusion.toolboxCommon'));

    // instantiate service
    var service, $modal, modalOpenSpy, $rootScope;

    //update the injection
    beforeEach(inject(function (vnErrorModalService, _$modal_, _$rootScope_) {
        service = vnErrorModalService;
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

    it('calls opens modal dialog with passed in template', function() {

		var messageScope = $rootScope.$new(true);
		messageScope.exceptionCode = '500';
		messageScope.exceptionMessage = 'Server error message goes here';

        service.showError('foo/bar', messageScope);
        expect(modalOpenSpy).to.have.been.calledWithExactly({
            templateUrl: 'foo/bar',
			scope: messageScope
        });
    });

    it('calls opens the modal dialog with default template if nothing is passed in', function() {

        service.showError();
        expect(modalOpenSpy).to.have.been.calledWithExactly({
            templateUrl: 'errormodal/vnErrorModal.tpl.html',
			scope: undefined
        });
    });
});
