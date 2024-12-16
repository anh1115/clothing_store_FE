import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function ProductDetailTabs({ description }) {
  const formattedDescription = description.replace(/\r\n/g, '<br />');
  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Mô tả sản phẩm">
        <div dangerouslySetInnerHTML={{ __html: formattedDescription }} />
      </Tab>
      <Tab eventKey="reviews" title="Đánh giá sản phẩm">
        Tab content for Reviews
      </Tab>
    </Tabs>
  );
}

export default ProductDetailTabs;