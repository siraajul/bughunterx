import { TestIssue, Status, Severity, Priority, TestType } from '../types';

const testTypes = ['UI Testing', 'Functional Testing', 'Smoke Testing', 'Integration Testing', 'API Testing', 'Performance Testing', 'Security Testing', 'Regression Testing'];
const severities = ['Critical', 'High', 'Medium', 'Low'];
const priorities = ['P0', 'P1', 'P2', 'P3'];
const statuses = ['Open', 'In Progress', 'Fixed', 'Closed'];
const reporters = ['QA Team', 'Vendor', 'Customer', 'Admin'];
const assignedTo = ['Backend Team', 'Frontend Team', 'DevOps Team', 'Security Team', 'Unassigned'];

const pageScreens = [
    'Customer Homepage',
    'Product Listing Page',
    'Product Detail Page',
    'Shopping Cart',
    'Checkout Process',
    'Payment Gateway Integration',
    'Customer Dashboard',
    'Customer Order History',
    'Customer Profile Settings',
    'Vendor Registration Page',
    'Vendor Login Page',
    'Vendor Dashboard',
    'Vendor Product Management',
    'Vendor Order Management',
    'Vendor Payout Settings',
    'Admin Dashboard',
    'Admin Vendor Management',
    'Admin Customer Management',
    'Admin Product Review',
    'Admin Order Fulfillment',
    'Admin Settings',
    'Search Results Page',
    'Category Page',
    'Wishlist Page',
    'Comparison Page',
    'Dispute Resolution Page',
    'API Endpoint - Product',
    'API Endpoint - Order',
    'API Endpoint - Authentication',
    'API Endpoint - Vendor',
    'API Endpoint - Payment',
    'Mobile Responsiveness (Various Pages)',
];

const issueTitles = [
    'Incorrect price displayed for product',
    'Cannot add product to cart',
    'Checkout process fails at payment step',
    'Vendor registration form submission error',
    'Vendor dashboard not loading data',
    'Product image not displaying correctly',
    'Search results are irrelevant/incomplete',
    'Unable to apply discount code',
    'Order status not updating correctly',
    'Security vulnerability on login page',
    'Slow page load time on product listing',
    'API endpoint returning incorrect data',
    'User able to bypass payment',
    'Vendor cannot manage product inventory',
    'Admin unable to approve vendor',
    'Email notifications not being sent',
    'Broken link on homepage banner',
    'Filter/sorting not working on listing page',
    'Mobile view layout broken on checkout',
    'Cross-site scripting vulnerability detected',
    'Database error during order placement',
    'Caching issue displaying old data',
    'Third-party integration failure (e.g., shipping, analytics)',
    'Error when uploading product images',
    'Vendor payout calculation incorrect',
    'Customer cannot leave product review',
    'Admin panel permission issue',
    'Incorrect tax calculation',
    'Localization/translation error',
    'Broken "Forgot Password" functionality',
    'High memory usage on product page',
    'Cross-origin resource sharing (CORS) error',
    'Missing validation on input fields',
    'Inconsistent UI elements across pages',
    'Error when deleting a user/vendor',
    'Product variation selection bug',
    'Shipping cost calculation error',
    'Wishlist not saving items',
    'Admin unable to generate reports',
    'Denial of Service vulnerability',
];

const issueDescriptions = [
    'Detailed steps to reproduce the issue and observed incorrect behavior.',
    'The issue occurs consistently when following the provided steps.',
    'Impact: Prevents users from completing a critical action.',
    'Observed on multiple browsers/devices.',
    'Issue appeared after the last deployment.',
];

const stepsToReproduce = [
    '1. Go to [Page/Feature].\n2. Perform [Action].\n3. Observe [Incorrect Behavior].\nExpected: [Correct Behavior].',
    'Preconditions: [Any necessary setup or user state].\nSteps: [Numbered steps].\nActual Result: [What happened].\nExpected Result: [What should have happened].',
];

const generateRandomDate = () => {
    const now = new Date();
    const past = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
    return new Date(randomTime).toISOString().split('T')[0];
};

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Using a simple index-based ID for these fixed demo issues
const generateIssueId = (type: string, index: number): string => {
    const typePrefix = type.replace(/[^A-Z]/g, '').substring(0, 3).toUpperCase();
    return `${typePrefix}-${(1000 + index).toString().padStart(4, '0')}`;
};

export const demoIssues: TestIssue[] = [];

for (let i = 0; i < 200; i++) {
    const randomTestType = getRandomItem(testTypes);
    const randomSeverity = getRandomItem(severities);
    const randomPriority = getRandomItem(priorities);
    const randomStatus = getRandomItem(statuses);
    const randomPageScreen = getRandomItem(pageScreens);

    demoIssues.push({
        id: generateIssueId(randomTestType, i),
        testType: randomTestType as TestType,
        dateReported: generateRandomDate(),
        reporter: getRandomItem(reporters) as string,
        pageScreen: randomPageScreen,
        testCase: `TC-${Math.floor(10000 + Math.random() * 90000)}`,
        issueTitle: getRandomItem(issueTitles),
        issueDescription: getRandomItem(issueDescriptions),
        stepsToReproduce: getRandomItem(stepsToReproduce),
        expectedBehavior: 'The system should function according to the requirements.',
        actualBehavior: 'The system did not function as expected.',
        severity: randomSeverity as Severity,
        priority: randomPriority as Priority,
        status: randomStatus as Status,
        browserDevice: getRandomItem(['Chrome on Windows', 'Firefox on Mac', 'Safari on iOS', 'Edge on Android']),
        screenshotUrl: '',
        assignedTo: getRandomItem(assignedTo) as string,
        dateFixed: randomStatus === 'Fixed' ? generateRandomDate() : '',
        comments: 'Initial report.',
    });
} 