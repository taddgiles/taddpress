describe('home page', function () {
  before(function(done) {
    this.timeout(5000);
    this.browser = new Browser();
    this.browser
      .visit(root)
      .then(done, done);
  });

  it("displays home page", function () {
    expect(this.browser.location.pathname).to.eql('/');
  });
});
