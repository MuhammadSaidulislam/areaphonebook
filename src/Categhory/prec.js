<Row>
{category.map((data, id) => (
  <Col md={6} lg={4} key={`homeCategory` + data.id}>
    <div className="card">
      <div
        className="card-header"
        data-toggle="collapse"
        data-target="#1"
      >
        <div className="overflow-hidden">
          <div className="card-content">
            <div className="cleartfix">
              <div className="media align-items-stretch d-flex">
                <div className="align-self-center">
                  <img
                    className="manu-img"
                    //   src={data.categoryName}
                    //   alt={data.categoryName}
                    src="image"
                    alt="image"
                  />
                </div>
                <div className="media-body">
                  <h3 className="manu-item">
                    <Link to={`/${data.categoryName}`}>
                      {data.categoryName}
                    </Link>
                  </h3>

                  <Row>
                    {subCategory.slice(0, 3).map((nameList, i) => (
                      <>
                        <span
                          key={nameList.id}
                          className="col-6 topic tp1"
                        >
                          {nameList.sub_category_name}
                        </span>
                      </>
                    ))}

                    <span
                      className="col-6 topic tp4"
                      onClick={() =>
                        toggleCollapse(
                          `a${data.categoryName}`,
                          data.categoryName
                        )
                      }
                      aria-expanded={
                        openCollapseId === `a${data.categoryName}`
                      }
                      aria-controls={`a${data.categoryName}`}
                    >
                      {" "}
                      <a data-toggle="collapse">
                        আরো দেখুন{" "}
                        <i className="fa fa-chevron-down"></i>
                      </a>{" "}
                    </span>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="a${data.categoryName}"
        className={`collapse ${
          openCollapseId === `a${data.categoryName}` ? "show" : ""
        }`}
      >
        <Container>
          <Row>
            {subCategory.map((subData) => (
              <>
                <Col xs={6}>
                  <span className="topic">
                    {" "}
                    <button key={subData.sub_id} className="lol">
                      {subData.sub_category_name}
                    </button>
                  </span>
                </Col>
              </>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  </Col>
))}
</Row>