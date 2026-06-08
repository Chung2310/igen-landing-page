const BASE_URL = 'http://localhost:5000/api/v1';

async function runTests() {
  console.log('--- STARTING INTEGRATION TESTS ---');

  try {
    // 1. Admin Login
    console.log('\n1. Logging in as Admin...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@igen.vn',
        password: 'Admin@123456',
      }),
    });
    const loginData = await loginRes.json();
    if (!loginData.success) {
      throw new Error(`Login failed: ${loginData.message}`);
    }
    const token = loginData.data.accessToken;
    console.log('✓ Login successful! Token acquired.');

    // 2. Create Article
    console.log('\n2. Creating an Article...');
    const articlePayload = {
      title: 'Tích hợp AI tạo sinh vào quy trình sản xuất',
      slug: 'tich-hop-ai-tao-sinh-quy-trinh-san-xuat',
      content: '<p>Chi tiết về cách thức triển khai Generative AI trong công nghiệp...</p>',
      excerpt: 'Tóm tắt ngắn về ứng dụng AI trong quy trình sản xuất doanh nghiệp.',
      category: 'AI Trends',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      status: 'published',
    };
    const createArticleRes = await fetch(`${BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articlePayload),
    });
    const createArticleData = await createArticleRes.json();
    if (!createArticleData.success) {
      throw new Error(`Article creation failed: ${createArticleData.message}`);
    }
    const articleId = createArticleData.data._id;
    console.log(`✓ Article created successfully! ID: ${articleId}`);

    // 3. Fetch public articles
    console.log('\n3. Fetching public articles...');
    const getArticlesRes = await fetch(`${BASE_URL}/articles?category=AI%20Trends`);
    const getArticlesData = await getArticlesRes.json();
    if (!getArticlesData.success) {
      throw new Error(`Failed to fetch articles: ${getArticlesData.message}`);
    }
    const foundArticle = getArticlesData.data.docs.find(a => a._id === articleId);
    if (!foundArticle) {
      throw new Error('Created article not found in public list.');
    }
    console.log('✓ Found created article in public articles list!');

    // 4. Fetch article details by slug
    console.log('\n4. Fetching article details by slug...');
    const getArticleDetailRes = await fetch(`${BASE_URL}/articles/tich-hop-ai-tao-sinh-quy-trinh-san-xuat`);
    const getArticleDetailData = await getArticleDetailRes.json();
    if (!getArticleDetailData.success) {
      throw new Error(`Failed to fetch article detail: ${getArticleDetailData.message}`);
    }
    console.log(`✓ Article detail retrieved! Title: ${getArticleDetailData.data.title}`);

    // 5. Update Article
    console.log('\n5. Updating article...');
    const updateArticleRes = await fetch(`${BASE_URL}/articles/${articleId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: 'Tích hợp AI tạo sinh vào quy trình sản xuất (Updated)',
      }),
    });
    const updateArticleData = await updateArticleRes.json();
    if (!updateArticleData.success) {
      throw new Error(`Article update failed: ${updateArticleData.message}`);
    }
    console.log('✓ Article updated successfully!');

    // 6. Submit contact form
    console.log('\n6. Submitting contact form...');
    const contactPayload = {
      name: 'Nguyen Van Test',
      email: 'test@example.com',
      phone: '0987654321',
      message: 'Tôi muốn được tư vấn giải pháp AI cho nông nghiệp thông minh.',
    };
    const contactRes = await fetch(`${BASE_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactPayload),
    });
    const contactData = await contactRes.json();
    if (!contactData.success) {
      throw new Error(`Contact submission failed: ${contactData.message}`);
    }
    console.log('✓ Contact form submitted successfully!');

    // 7. Get contacts list (as admin)
    console.log('\n7. Retrieving contacts list as admin...');
    const getContactsRes = await fetch(`${BASE_URL}/contacts?limit=10`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const getContactsData = await getContactsRes.json();
    if (!getContactsData.success) {
      throw new Error(`Failed to retrieve contacts: ${getContactsData.message}`);
    }
    const foundContact = getContactsData.data.docs.find(c => c.email === 'test@example.com');
    if (!foundContact) {
      throw new Error('Submitted contact not found in admin list.');
    }
    const contactId = foundContact._id;
    console.log(`✓ Contact retrieved in admin dashboard! ID: ${contactId}`);

    // 8. Update contact status (as admin)
    console.log('\n8. Updating contact status to read...');
    const updateContactRes = await fetch(`${BASE_URL}/contacts/${contactId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: 'read' }),
    });
    const updateContactData = await updateContactRes.json();
    if (!updateContactData.success) {
      throw new Error(`Contact status update failed: ${updateContactData.message}`);
    }
    console.log('✓ Contact status updated to read successfully!');

    // 9. Delete Article
    console.log('\n9. Cleaning up test article...');
    const deleteArticleRes = await fetch(`${BASE_URL}/articles/${articleId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    const deleteArticleData = await deleteArticleRes.json();
    if (!deleteArticleData.success) {
      throw new Error(`Article deletion failed: ${deleteArticleData.message}`);
    }
    console.log('✓ Test article deleted successfully.');

    console.log('\n======================================');
    console.log('✓ ALL INTEGRATION TESTS PASSED WITH EXIT CODE 0!');
    console.log('======================================');
    process.exit(0);

  } catch (err) {
    console.error('\n❌ TEST FAILED:', err.message);
    process.exit(1);
  }
}

runTests();
