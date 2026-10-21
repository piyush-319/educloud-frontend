import { useEffect, useState } from "react";
import "./App.css";
import { extraCourseLessons } from "./extraLessons.js";
import ExtraCourseLesson from "./ExtraCourseLesson.jsx";

const API_URL = import.meta.env.VITE_API_URL || "";

const fallbackCourses = [
  {
    id: 1,
    title: "AWS Cloud",
    description: "Learn AWS cloud services and practical cloud skills.",
    icon: "☁️",
  },
  {
    id: 2,
    title: "Linux & DevOps",
    description: "Learn Linux, DevOps and server management.",
    icon: "🐧",
  },
  {
    id: 3,
    title: "Python",
    description: "Learn Python programming through practical projects.",
    icon: "🐍",
  },
];

const lessonMeta = {
  1: { image: "/lesson-icons/aws.svg", type: "Video Lesson", duration: "~ 15 min", className: "aws" },
  2: { image: "/lesson-icons/ec2.svg", type: "Video Lesson", duration: "~ 20 min", className: "ec2" },
  3: { image: "/lesson-icons/s3.svg", type: "Video Lesson", duration: "~ 18 min", className: "s3" },
  4: { image: "/lesson-icons/iam.svg", type: "Video Lesson", duration: "~ 16 min", className: "iam" },
  5: { image: "/lesson-icons/rds.svg", type: "Video Lesson", duration: "~ 18 min", className: "rds" },
  6: { image: "/lesson-icons/vpc.svg", type: "Video Lesson", duration: "~ 20 min", className: "vpc" },
  7: { image: "/lesson-icons/elb.svg", type: "Video Lesson", duration: "~ 20 min", className: "alb" },
  8: { image: "/lesson-icons/cloudwatch.svg", type: "Video Lesson", duration: "~ 18 min", className: "cloudwatch" },
  9: { image: "/lesson-icons/lambda.svg", type: "Video Lesson", duration: "~ 20 min", className: "lambda" },
  10: { image: "/lesson-icons/cloudfront.svg", type: "Video Lesson", duration: "~ 18 min", className: "cloudfront" },
};

const lesson1Quiz = [
  {
    question: "Which AWS service runs a Node.js application?",
    options: ["S3", "EC2", "IAM", "RDS"],
    answer: 1,
    explanation: "EC2 provides virtual computing capacity that can be used to run applications.",
  },
  {
    question: "Which AWS service is used for cloud object storage?",
    options: ["EC2", "IAM", "S3", "VPC"],
    answer: 2,
    explanation: "S3 is cloud object storage for files, images and backups.",
  },
  {
    question: "Which AWS service is used as a database?",
    options: ["RDS", "S3", "EC2", "Region"],
    answer: 0,
    explanation: "RDS is the database service in this lesson's AWS fundamentals model.",
  },
  {
    question: "Which AWS service handles permissions and secure access?",
    options: ["VPC", "IAM", "S3", "RDS"],
    answer: 1,
    explanation: "IAM is used for users, permissions and secure access to AWS resources.",
  },
  {
    question: "What is an AWS Region?",
    options: [
      "A geographic area containing AWS infrastructure",
      "A virtual server",
      "A storage bucket",
      "A user permission",
    ],
    answer: 0,
    explanation: "A Region is a geographic area containing AWS infrastructure.",
  },
];

const quizPassScore = 4;

const lesson5Quiz = [
  {
    question: "What is Amazon RDS mainly used for?",
    options: [
      "Running managed relational databases",
      "Storing images as objects",
      "Managing IAM users",
      "Creating virtual networks",
    ],
    answer: 0,
    explanation:
      "Amazon RDS is a managed service for running relational databases such as PostgreSQL and MySQL.",
  },
  {
    question: "Which database engine can Amazon RDS support?",
    options: [
      "PostgreSQL",
      "Only MongoDB",
      "Only Redis",
      "Only DynamoDB",
    ],
    answer: 0,
    explanation:
      "Amazon RDS supports relational database engines including PostgreSQL, MySQL, MariaDB, Oracle and SQL Server.",
  },
  {
    question: "What is one major benefit of using Amazon RDS?",
    options: [
      "AWS manages many database administration tasks",
      "It removes the need for passwords",
      "It makes every database public",
      "It replaces IAM completely",
    ],
    answer: 0,
    explanation:
      "RDS handles many operational tasks such as backups, patching and infrastructure management.",
  },
  {
    question: "What controls network traffic to an RDS instance?",
    options: [
      "Security Groups",
      "S3 buckets",
      "IAM groups only",
      "AMI files",
    ],
    answer: 0,
    explanation:
      "RDS instances can use Security Groups to control which network traffic is allowed to reach the database.",
  },
  {
    question: "Why are automated backups useful in Amazon RDS?",
    options: [
      "They help recover database data when needed",
      "They make the database publicly accessible",
      "They delete old database records immediately",
      "They disable database security",
    ],
    answer: 0,
    explanation:
      "Automated backups help protect database data and support recovery when data needs to be restored.",
  },
];

const lesson6Quiz = [
  {
    question: "What is an AWS VPC mainly used for?",
    options: [
      "Creating an isolated virtual network",
      "Storing objects and images",
      "Sending emails",
      "Managing database backups",
    ],
    answer: 0,
    explanation: "Amazon VPC lets you create an isolated virtual network for AWS resources.",
  },
  {
    question: "What is a subnet in a VPC?",
    options: [
      "A smaller network range inside a VPC",
      "A database engine",
      "A storage bucket",
      "An IAM policy",
    ],
    answer: 0,
    explanation: "A subnet is a smaller IP address range inside a VPC.",
  },
  {
    question: "What does an Internet Gateway provide?",
    options: [
      "A path between a VPC and the internet",
      "Database encryption",
      "Object storage",
      "User authentication",
    ],
    answer: 0,
    explanation: "An Internet Gateway allows resources in a VPC to communicate with the internet when routing and security rules allow it.",
  },
  {
    question: "What is a route table used for in a VPC?",
    options: [
      "Controlling where network traffic is sent",
      "Creating database users",
      "Storing application files",
      "Monitoring CPU usage",
    ],
    answer: 0,
    explanation: "Route tables contain rules that determine where network traffic should go.",
  },
  {
    question: "Which AWS feature controls inbound and outbound traffic for an EC2 instance?",
    options: [
      "Security Group",
      "S3 Bucket",
      "CloudFront",
      "Lambda Function",
    ],
    answer: 0,
    explanation: "Security Groups act as virtual firewalls for AWS resources such as EC2 instances.",
  },
];

const lesson7Quiz = [
  {
    question: "What is the main purpose of a load balancer?",
    options: [
      "Distribute incoming traffic across targets",
      "Store database backups",
      "Create IAM users",
      "Store static objects",
    ],
    answer: 0,
    explanation: "A load balancer distributes incoming application traffic across healthy targets.",
  },
  {
    question: "What does Auto Scaling help an application do?",
    options: [
      "Adjust compute capacity based on demand",
      "Create S3 buckets automatically",
      "Replace IAM permissions",
      "Encrypt every database automatically",
    ],
    answer: 0,
    explanation: "Auto Scaling can add or remove compute capacity as application demand changes.",
  },
  {
    question: "Why is a load balancer useful with multiple EC2 instances?",
    options: [
      "It can distribute requests across the instances",
      "It turns EC2 into a database",
      "It removes the need for networking",
      "It stores all application files",
    ],
    answer: 0,
    explanation: "A load balancer can distribute requests across multiple EC2 instances.",
  },
  {
    question: "What does a health check help a load balancer determine?",
    options: [
      "Whether a target is healthy",
      "Whether an IAM password is strong",
      "Whether an S3 object is public",
      "Whether a Lambda function has code",
    ],
    answer: 0,
    explanation: "Health checks help determine whether targets are available to receive traffic.",
  },
  {
    question: "What is one benefit of Auto Scaling?",
    options: [
      "It can improve availability by maintaining suitable capacity",
      "It removes all security controls",
      "It makes every server public",
      "It replaces the load balancer",
    ],
    answer: 0,
    explanation: "Auto Scaling can help maintain enough capacity to handle changing demand and improve availability.",
  },
];

const lesson8Quiz = [
  {
    question: "What is Amazon CloudWatch mainly used for?",
    options: [
      "Monitoring AWS resources and applications",
      "Creating relational databases",
      "Hosting DNS zones only",
      "Managing IAM passwords only",
    ],
    answer: 0,
    explanation: "CloudWatch provides monitoring for AWS resources and applications through metrics, logs and alarms.",
  },
  {
    question: "What can CloudWatch collect from applications?",
    options: [
      "Logs",
      "IAM users",
      "S3 buckets",
      "VPC subnets",
    ],
    answer: 0,
    explanation: "CloudWatch Logs can collect and store log data from applications and AWS services.",
  },
  {
    question: "What is a CloudWatch alarm used for?",
    options: [
      "Taking action or notifying when a metric crosses a threshold",
      "Creating an EC2 AMI",
      "Creating an S3 bucket",
      "Changing a database engine",
    ],
    answer: 0,
    explanation: "CloudWatch alarms monitor metrics and can trigger notifications or actions when configured conditions are met.",
  },
  {
    question: "Which is an example of an EC2 metric?",
    options: [
      "CPU utilization",
      "IAM username",
      "S3 bucket name",
      "VPC CIDR name",
    ],
    answer: 0,
    explanation: "CPU utilization is a common CloudWatch metric for EC2 instances.",
  },
  {
    question: "Why are CloudWatch logs useful?",
    options: [
      "They help troubleshoot application and service activity",
      "They replace all database backups",
      "They automatically create VPCs",
      "They remove the need for security groups",
    ],
    answer: 0,
    explanation: "Logs provide detailed records that can help identify errors and troubleshoot applications.",
  },
];

const lesson9Quiz = [
  {
    question: "What is AWS Lambda?",
    options: [
      "A serverless compute service",
      "A relational database",
      "An object storage service",
      "A virtual network",
    ],
    answer: 0,
    explanation: "AWS Lambda runs code without requiring you to manage servers directly.",
  },
  {
    question: "What can trigger a Lambda function?",
    options: [
      "Events from AWS services or applications",
      "Only manual server restarts",
      "Only database passwords",
      "Only EC2 disk formatting",
    ],
    answer: 0,
    explanation: "Lambda functions can be triggered by events from many AWS services and applications.",
  },
  {
    question: "What is a key benefit of Lambda?",
    options: [
      "You pay based on function execution and resources used",
      "You must manage physical servers",
      "It automatically creates every AWS resource",
      "It requires a dedicated EC2 server for every function",
    ],
    answer: 0,
    explanation: "Lambda uses a serverless model where you are charged based on function execution and configured resources.",
  },
  {
    question: "What does a Lambda function contain?",
    options: [
      "Code that runs in response to events",
      "A VPC route table only",
      "An S3 storage class only",
      "An IAM password database",
    ],
    answer: 0,
    explanation: "A Lambda function contains code and configuration that AWS executes when invoked.",
  },
  {
    question: "Which use case fits AWS Lambda?",
    options: [
      "Running code when an event occurs",
      "Managing a physical server rack",
      "Replacing every database",
      "Creating internet cables",
    ],
    answer: 0,
    explanation: "Lambda is well suited for event-driven workloads where code runs in response to events.",
  },
];

const lesson10Quiz = [
  {
    question: "What is Amazon CloudFront?",
    options: [
      "A content delivery network",
      "A relational database",
      "An IAM service",
      "A virtual machine service",
    ],
    answer: 0,
    explanation: "Amazon CloudFront is AWS's content delivery network for delivering content with low latency.",
  },
  {
    question: "What is a CloudFront edge location used for?",
    options: [
      "Serving content closer to users",
      "Creating database schemas",
      "Managing IAM passwords",
      "Creating VPC route tables",
    ],
    answer: 0,
    explanation: "CloudFront uses edge locations to cache and deliver content closer to end users.",
  },
  {
    question: "What can CloudFront distribute?",
    options: [
      "Web content such as images, files and application responses",
      "Only IAM users",
      "Only database passwords",
      "Only VPC route tables",
    ],
    answer: 0,
    explanation: "CloudFront can distribute static and dynamic web content to users globally.",
  },
  {
    question: "What is one benefit of CloudFront caching?",
    options: [
      "It can reduce latency for users",
      "It removes all security requirements",
      "It replaces every origin server",
      "It creates database backups",
    ],
    answer: 0,
    explanation: "Caching content at edge locations can reduce the distance data travels and improve response times.",
  },
  {
    question: "What is the origin in a CloudFront distribution?",
    options: [
      "The source where CloudFront gets content",
      "An IAM user",
      "A VPC security group",
      "A database password",
    ],
    answer: 0,
    explanation: "An origin is the source of the content that CloudFront distributes, such as an S3 bucket or web server.",
  },
];

const lesson4Quiz = [
  {
    question: "What is AWS IAM mainly used for?",
    options: [
      "Storing files",
      "Managing users, permissions and access to AWS resources",
      "Running virtual servers",
      "Creating databases",
    ],
    answer: 1,
    explanation:
      "AWS IAM helps you securely manage identities, permissions and access to AWS resources.",
  },
  {
    question: "What does an IAM user represent?",
    options: [
      "A storage bucket",
      "An individual identity that can authenticate and access AWS resources",
      "A physical AWS server",
      "A database table",
    ],
    answer: 1,
    explanation:
      "An IAM user is an identity that can be given credentials and permissions to access AWS resources.",
  },
  {
    question: "What is an IAM policy?",
    options: [
      "A set of permissions that defines what actions are allowed or denied",
      "A server image",
      "A storage container",
      "A network cable",
    ],
    answer: 0,
    explanation:
      "IAM policies define permissions by specifying which actions are allowed or denied on AWS resources.",
  },
  {
    question: "What is the principle of least privilege?",
    options: [
      "Give every user administrator access",
      "Give users only the permissions they actually need",
      "Disable all AWS services",
      "Allow access from every IP address",
    ],
    answer: 1,
    explanation:
      "Least privilege means giving an identity only the permissions required to perform its tasks.",
  },
  {
    question: "Why should the AWS root user be protected carefully?",
    options: [
      "It has broad access to the AWS account",
      "It can only access S3",
      "It cannot change account settings",
      "It is used only for reading logs",
    ],
    answer: 0,
    explanation:
      "The root user has extremely broad account-level privileges, so it should be protected and used only when necessary.",
  },
];


const lesson3Quiz = [
  {
    question: "What is Amazon S3 mainly used for?",
    options: [
      "Running virtual servers",
      "Object storage",
      "Managing users",
      "Creating virtual networks",
    ],
    answer: 1,
    explanation:
      "Amazon S3 is an object storage service used to store and retrieve files and other data.",
  },
  {
    question: "What is an S3 bucket?",
    options: [
      "A container for storing objects",
      "A virtual server",
      "A database table",
      "A firewall rule",
    ],
    answer: 0,
    explanation:
      "An S3 bucket is a container where objects such as files, images and backups can be stored.",
  },
  {
    question: "What is an object in Amazon S3?",
    options: [
      "A physical AWS server",
      "A stored piece of data such as a file",
      "An IAM user",
      "A network port",
    ],
    answer: 1,
    explanation:
      "An S3 object is a piece of data stored in a bucket, such as an image, document or backup file.",
  },
  {
    question: "Which statement about S3 bucket access is correct?",
    options: [
      "Every S3 bucket is automatically public",
      "Access can be controlled using AWS permissions and bucket policies",
      "S3 does not support access control",
      "Only EC2 instances can access S3",
    ],
    answer: 1,
    explanation:
      "S3 access can be controlled using IAM permissions, bucket policies and related security controls.",
  },
  {
    question: "Which is a common use case for Amazon S3?",
    options: [
      "Storing website images and backups",
      "Running a Node.js server",
      "Opening SSH port 22",
      "Creating an EC2 instance type",
    ],
    answer: 0,
    explanation:
      "S3 is commonly used for files, images, backups, static assets and other object-storage workloads.",
  },
];



const lesson2Quiz = [
  {
    question: "What is Amazon EC2 mainly used for?",
    options: [
      "Object storage",
      "Running virtual servers and applications",
      "Managing DNS records",
      "Sending email",
    ],
    answer: 1,
    explanation:
      "Amazon EC2 provides virtual servers that you can use to run applications and workloads in AWS.",
  },
  {
    question: "What is an AMI in EC2?",
    options: [
      "A database password",
      "A firewall rule",
      "A template used to launch an EC2 instance",
      "A billing report",
    ],
    answer: 2,
    explanation:
      "An AMI (Amazon Machine Image) contains the information needed to launch an EC2 instance.",
  },
  {
    question: "What does an EC2 instance type primarily describe?",
    options: [
      "The hardware resources available to the instance",
      "The AWS account password",
      "The domain name of the application",
      "The S3 bucket name",
    ],
    answer: 0,
    explanation:
      "An EC2 instance type determines the compute, memory and other hardware resources available to the instance.",
  },
  {
    question: "What is the purpose of an EC2 Security Group?",
    options: [
      "To store application files",
      "To control inbound and outbound network traffic",
      "To create database tables",
      "To select an AWS Region",
    ],
    answer: 1,
    explanation:
      "A Security Group acts as a virtual firewall controlling network traffic to and from an EC2 instance.",
  },
  {
    question: "Which IP address can be used to reach an EC2 server from the public internet?",
    options: [
      "A public IP address",
      "A private subnet ID",
      "An AMI ID",
      "A security group ID",
    ],
    answer: 0,
    explanation:
      "A public IP address allows an EC2 instance to be reachable from the public internet when networking and security rules permit it.",
  },
];

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [courses, setCourses] = useState(fallbackCourses);
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(null);
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [authMessage, setAuthMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progressLoading, setProgressLoading] = useState(false);

  const [resetToken, setResetToken] = useState("");
  const [resetForm, setResetForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizPassed, setQuizPassed] = useState(false);

  const [lesson2QuizAnswers, setLesson2QuizAnswers] = useState({});
  const [lesson2QuizSubmitted, setLesson2QuizSubmitted] = useState(false);
  const [lesson2QuizScore, setLesson2QuizScore] = useState(0);
  const [lesson2QuizPassed, setLesson2QuizPassed] = useState(false);
  const [lesson3QuizAnswers, setLesson3QuizAnswers] = useState({});
  const [lesson3QuizSubmitted, setLesson3QuizSubmitted] = useState(false);
  const [lesson3QuizScore, setLesson3QuizScore] = useState(0);
  const [lesson3QuizPassed, setLesson3QuizPassed] = useState(false);
  const [lesson4QuizAnswers, setLesson4QuizAnswers] = useState({});
  const [lesson4QuizSubmitted, setLesson4QuizSubmitted] = useState(false);
  const [lesson4QuizScore, setLesson4QuizScore] = useState(0);
  const [lesson4QuizPassed, setLesson4QuizPassed] = useState(false);
  const [lesson5QuizAnswers, setLesson5QuizAnswers] = useState({});
  const [lesson5QuizSubmitted, setLesson5QuizSubmitted] = useState(false);
  const [lesson5QuizScore, setLesson5QuizScore] = useState(0);
  const [lesson5QuizPassed, setLesson5QuizPassed] = useState(false);
  const [lesson5QuizValidationError, setLesson5QuizValidationError] = useState(false);

  const [lesson6QuizAnswers, setLesson6QuizAnswers] = useState({});
  const [lesson6QuizSubmitted, setLesson6QuizSubmitted] = useState(false);
  const [lesson6QuizScore, setLesson6QuizScore] = useState(0);
  const [lesson6QuizPassed, setLesson6QuizPassed] = useState(false);

  const [lesson7QuizAnswers, setLesson7QuizAnswers] = useState({});
  const [lesson7QuizSubmitted, setLesson7QuizSubmitted] = useState(false);
  const [lesson7QuizScore, setLesson7QuizScore] = useState(0);
  const [lesson7QuizPassed, setLesson7QuizPassed] = useState(false);

  const [lesson8QuizAnswers, setLesson8QuizAnswers] = useState({});
  const [lesson8QuizSubmitted, setLesson8QuizSubmitted] = useState(false);
  const [lesson8QuizScore, setLesson8QuizScore] = useState(0);
  const [lesson8QuizPassed, setLesson8QuizPassed] = useState(false);

  const [lesson9QuizAnswers, setLesson9QuizAnswers] = useState({});
  const [lesson9QuizSubmitted, setLesson9QuizSubmitted] = useState(false);
  const [lesson9QuizScore, setLesson9QuizScore] = useState(0);
  const [lesson9QuizPassed, setLesson9QuizPassed] = useState(false);

  const [lesson10QuizAnswers, setLesson10QuizAnswers] = useState({});
  const [lesson10QuizSubmitted, setLesson10QuizSubmitted] = useState(false);
  const [lesson10QuizScore, setLesson10QuizScore] = useState(0);
  const [lesson10QuizPassed, setLesson10QuizPassed] = useState(false);

  const [lessonActionMessage, setLessonActionMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlResetToken = params.get("resetToken");

    if (urlResetToken) {
      setResetToken(urlResetToken);
      setAuthMode("reset");
      setAuthMessage("");
    }
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/courses`)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load courses");
        return response.json();
      })
      .then((data) => setCourses(Array.isArray(data) && data.length ? data : fallbackCourses))
      .catch((error) => {
        console.error("Courses loading error:", error);
        setCourses(fallbackCourses);
      });

    const token = localStorage.getItem("educloud_token");
    if (!token) return;

    fetch(`${API_URL}/api/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Invalid session");
        return response.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => localStorage.removeItem("educloud_token"));
  }, []);

  useEffect(() => {
    if (!user) {
      setCompletedLessons([]);
      return;
    }

    const token = localStorage.getItem("educloud_token");
    if (!token) {
      setCompletedLessons([]);
      return;
    }

    setProgressLoading(true);
    fetch(`${API_URL}/api/progress`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to fetch progress");
        return response.json();
      })
      .then((data) => {
        setCompletedLessons(
          Array.isArray(data)
            ? data.map((item) => Number(item.lesson_id)).filter(Number.isInteger)
            : []
        );
      })
      .catch((error) => {
        console.error("Progress loading error:", error);
        setCompletedLessons([]);
      })
      .finally(() => setProgressLoading(false));
  }, [user]);

  useEffect(() => {
    if (!selectedCourse) {
      setLessons([]);
      setSelectedLesson(null);
      return;
    }

    // Linux and Python use the local course content. AWS remains API-backed.
    if (selectedCourse.id === 2 || selectedCourse.id === 3) {
      const courseLessons = (extraCourseLessons[selectedCourse.id] || []).map(
        (lesson, index) => ({
          ...lesson,
          id: `${selectedCourse.id}-${index + 1}`,
          lesson_order: index + 1,
          course_id: selectedCourse.id,
          content: lesson.overview || lesson.content || "",
        })
      );

      setLessons(courseLessons);
      setSelectedLesson((currentLesson) => {
        if (!courseLessons.length) return null;
        return courseLessons.find((lesson) => lesson.id === currentLesson?.id) || courseLessons[0];
      });
      return;
    }

    fetch(`${API_URL}/api/courses/${selectedCourse.id}/lessons`)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load lessons");
        return response.json();
      })
      .then((data) => {
        const courseLessons = Array.isArray(data) ? data : [];
        setLessons(courseLessons);
        setSelectedLesson((currentLesson) => {
          if (!courseLessons.length) return null;
          return courseLessons.find((lesson) => lesson.id === currentLesson?.id) || courseLessons[0];
        });
      })
      .catch((error) => {
        console.error("Lessons loading error:", error);
        setLessons([]);
        setSelectedLesson(null);
      });
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedLesson?.id !== 1) return;

    const alreadyCompleted = completedLessons.includes(1);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizPassed(alreadyCompleted);
    setLessonActionMessage("");
  }, [selectedLesson?.id, completedLessons]);

  useEffect(() => {
    if (selectedLesson?.id !== 2) return;

    const alreadyCompleted = completedLessons.includes(2);
    setLesson2QuizAnswers({});
    setLesson2QuizSubmitted(false);
    setLesson2QuizScore(0);
    setLesson2QuizPassed(alreadyCompleted);
    setLessonActionMessage("");
  }, [selectedLesson?.id, completedLessons]);

  useEffect(() => {
    if (selectedLesson?.id !== 3) return;

    const alreadyCompleted = completedLessons.includes(3);
    setLesson3QuizAnswers({});
    setLesson3QuizSubmitted(false);
    setLesson3QuizScore(0);
    setLesson3QuizPassed(alreadyCompleted);
    setLessonActionMessage("");
  }, [selectedLesson?.id, completedLessons]);

  useEffect(() => {
    if (selectedLesson?.id !== 4) return;

    const alreadyCompleted = completedLessons.includes(4);
    setLesson4QuizAnswers({});
    setLesson4QuizSubmitted(false);
    setLesson4QuizScore(0);
    setLesson4QuizPassed(alreadyCompleted);
    setLessonActionMessage("");
  }, [selectedLesson?.id, completedLessons]);

  useEffect(() => {
    if (selectedLesson?.id !== 5) return;

    const alreadyCompleted = completedLessons.includes(5);
    setLesson5QuizAnswers({});
    setLesson5QuizSubmitted(false);
    setLesson5QuizScore(0);
    setLesson5QuizPassed(alreadyCompleted);
    setLesson5QuizValidationError(false);
    setLessonActionMessage("");
  }, [selectedLesson?.id, completedLessons]);

  useEffect(() => {
    if (selectedLesson?.id !== 6) return;
    const alreadyCompleted = completedLessons.includes(6);
    setLesson6QuizAnswers({});
    setLesson6QuizSubmitted(false);
    setLesson6QuizScore(0);
    setLesson6QuizPassed(alreadyCompleted);
    setLessonActionMessage("");
  }, [selectedLesson?.id, completedLessons]);

  useEffect(() => {
    if (selectedLesson?.id !== 7) return;
    const alreadyCompleted = completedLessons.includes(7);
    setLesson7QuizAnswers({});
    setLesson7QuizSubmitted(false);
    setLesson7QuizScore(0);
    setLesson7QuizPassed(alreadyCompleted);
    setLessonActionMessage("");
  }, [selectedLesson?.id, completedLessons]);

  useEffect(() => {
    if (selectedLesson?.id !== 8) return;
    const alreadyCompleted = completedLessons.includes(8);
    setLesson8QuizAnswers({});
    setLesson8QuizSubmitted(false);
    setLesson8QuizScore(0);
    setLesson8QuizPassed(alreadyCompleted);
    setLessonActionMessage("");
  }, [selectedLesson?.id, completedLessons]);

  useEffect(() => {
    if (selectedLesson?.id !== 9) return;
    const alreadyCompleted = completedLessons.includes(9);
    setLesson9QuizAnswers({});
    setLesson9QuizSubmitted(false);
    setLesson9QuizScore(0);
    setLesson9QuizPassed(alreadyCompleted);
    setLessonActionMessage("");
  }, [selectedLesson?.id, completedLessons]);

  useEffect(() => {
    if (selectedLesson?.id !== 10) return;
    const alreadyCompleted = completedLessons.includes(10);
    setLesson10QuizAnswers({});
    setLesson10QuizSubmitted(false);
    setLesson10QuizScore(0);
    setLesson10QuizPassed(alreadyCompleted);
    setLessonActionMessage("");
  }, [selectedLesson?.id, completedLessons]);

  const handleLesson6QuizAnswer = (questionIndex, optionIndex) => {
    if (lesson6QuizSubmitted) return;

    setLesson6QuizAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));
    setLessonActionMessage("");
  };

  const handleLesson6QuizSubmit = () => {
    if (Object.keys(lesson6QuizAnswers).length < lesson6Quiz.length) {
      setLessonActionMessage(
        `Please answer all ${lesson6Quiz.length} questions before submitting the VPC quiz.`
      );
      return;
    }

    let score = 0;
    lesson6Quiz.forEach((question, index) => {
      if (lesson6QuizAnswers[index] === question.answer) score += 1;
    });

    setLesson6QuizScore(score);
    setLesson6QuizSubmitted(true);

    if (score >= quizPassScore) {
      setLesson6QuizPassed(true);
      setLessonActionMessage(
        `🎉 VPC quiz passed! You scored ${score}/${lesson6Quiz.length}. You can now complete Lesson 6.`
      );
    } else {
      setLesson6QuizPassed(false);
      setLessonActionMessage(
        `You scored ${score}/${lesson6Quiz.length}. You need at least ${quizPassScore}/${lesson6Quiz.length} to pass. Review the lesson and try again.`
      );
    }
  };

  const handleLesson6QuizRetry = () => {
    setLesson6QuizAnswers({});
    setLesson6QuizSubmitted(false);
    setLesson6QuizScore(0);
    setLesson6QuizPassed(false);
    setLessonActionMessage("");
  };

  const handleLesson7QuizAnswer = (questionIndex, optionIndex) => {
    if (lesson7QuizSubmitted) return;

    setLesson7QuizAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));
    setLessonActionMessage("");
  };

  const handleLesson7QuizSubmit = () => {
    if (Object.keys(lesson7QuizAnswers).length < lesson7Quiz.length) {
      setLessonActionMessage(
        `Please answer all ${lesson7Quiz.length} questions before submitting the Load Balancer + Auto Scaling quiz.`
      );
      return;
    }

    let score = 0;
    lesson7Quiz.forEach((question, index) => {
      if (lesson7QuizAnswers[index] === question.answer) score += 1;
    });

    setLesson7QuizScore(score);
    setLesson7QuizSubmitted(true);

    if (score >= quizPassScore) {
      setLesson7QuizPassed(true);
      setLessonActionMessage(
        `🎉 Load Balancer + Auto Scaling quiz passed! You scored ${score}/${lesson7Quiz.length}. You can now complete Lesson 7.`
      );
    } else {
      setLesson7QuizPassed(false);
      setLessonActionMessage(
        `You scored ${score}/${lesson7Quiz.length}. You need at least ${quizPassScore}/${lesson7Quiz.length} to pass. Review the lesson and try again.`
      );
    }
  };

  const handleLesson7QuizRetry = () => {
    setLesson7QuizAnswers({});
    setLesson7QuizSubmitted(false);
    setLesson7QuizScore(0);
    setLesson7QuizPassed(false);
    setLessonActionMessage("");
  };

  const handleLesson8QuizAnswer = (questionIndex, optionIndex) => {
    if (lesson8QuizSubmitted) return;

    setLesson8QuizAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));
    setLessonActionMessage("");
  };

  const handleLesson8QuizSubmit = () => {
    if (Object.keys(lesson8QuizAnswers).length < lesson8Quiz.length) {
      setLessonActionMessage(
        `Please answer all ${lesson8Quiz.length} questions before submitting the CloudWatch quiz.`
      );
      return;
    }

    let score = 0;
    lesson8Quiz.forEach((question, index) => {
      if (lesson8QuizAnswers[index] === question.answer) score += 1;
    });

    setLesson8QuizScore(score);
    setLesson8QuizSubmitted(true);

    if (score >= quizPassScore) {
      setLesson8QuizPassed(true);
      setLessonActionMessage(
        `🎉 CloudWatch quiz passed! You scored ${score}/${lesson8Quiz.length}. You can now complete Lesson 8.`
      );
    } else {
      setLesson8QuizPassed(false);
      setLessonActionMessage(
        `You scored ${score}/${lesson8Quiz.length}. You need at least ${quizPassScore}/${lesson8Quiz.length} to pass. Review the lesson and try again.`
      );
    }
  };

  const handleLesson8QuizRetry = () => {
    setLesson8QuizAnswers({});
    setLesson8QuizSubmitted(false);
    setLesson8QuizScore(0);
    setLesson8QuizPassed(false);
    setLessonActionMessage("");
  };

  const handleLesson9QuizAnswer = (questionIndex, optionIndex) => {
    if (lesson9QuizSubmitted) return;

    setLesson9QuizAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));
    setLessonActionMessage("");
  };

  const handleLesson9QuizSubmit = () => {
    if (Object.keys(lesson9QuizAnswers).length < lesson9Quiz.length) {
      setLessonActionMessage(
        `Please answer all ${lesson9Quiz.length} questions before submitting the Lambda quiz.`
      );
      return;
    }

    let score = 0;
    lesson9Quiz.forEach((question, index) => {
      if (lesson9QuizAnswers[index] === question.answer) score += 1;
    });

    setLesson9QuizScore(score);
    setLesson9QuizSubmitted(true);

    if (score >= quizPassScore) {
      setLesson9QuizPassed(true);
      setLessonActionMessage(
        `🎉 Lambda quiz passed! You scored ${score}/${lesson9Quiz.length}. You can now complete Lesson 9.`
      );
    } else {
      setLesson9QuizPassed(false);
      setLessonActionMessage(
        `You scored ${score}/${lesson9Quiz.length}. You need at least ${quizPassScore}/${lesson9Quiz.length} to pass. Review the lesson and try again.`
      );
    }
  };

  const handleLesson9QuizRetry = () => {
    setLesson9QuizAnswers({});
    setLesson9QuizSubmitted(false);
    setLesson9QuizScore(0);
    setLesson9QuizPassed(false);
    setLessonActionMessage("");
  };

  const handleLesson10QuizAnswer = (questionIndex, optionIndex) => {
    if (lesson10QuizSubmitted) return;

    setLesson10QuizAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));
    setLessonActionMessage("");
  };

  const handleLesson10QuizSubmit = () => {
    if (Object.keys(lesson10QuizAnswers).length < lesson10Quiz.length) {
      setLessonActionMessage(
        `Please answer all ${lesson10Quiz.length} questions before submitting the CloudFront quiz.`
      );
      return;
    }

    let score = 0;
    lesson10Quiz.forEach((question, index) => {
      if (lesson10QuizAnswers[index] === question.answer) score += 1;
    });

    setLesson10QuizScore(score);
    setLesson10QuizSubmitted(true);

    if (score >= quizPassScore) {
      setLesson10QuizPassed(true);
      setLessonActionMessage(
        `🎉 CloudFront quiz passed! You scored ${score}/${lesson10Quiz.length}. You can now complete Lesson 10.`
      );
    } else {
      setLesson10QuizPassed(false);
      setLessonActionMessage(
        `You scored ${score}/${lesson10Quiz.length}. You need at least ${quizPassScore}/${lesson10Quiz.length} to pass. Review the lesson and try again.`
      );
    }
  };

  const handleLesson10QuizRetry = () => {
    setLesson10QuizAnswers({});
    setLesson10QuizSubmitted(false);
    setLesson10QuizScore(0);
    setLesson10QuizPassed(false);
    setLessonActionMessage("");
  };

  const handleLesson5QuizAnswer = (questionIndex, optionIndex) => {
    if (lesson5QuizSubmitted) return;

    setLesson5QuizAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));

    setLesson5QuizValidationError(false);
    setLessonActionMessage("");
  };

  const handleLesson5QuizSubmit = () => {
    const answeredCount = Object.keys(lesson5QuizAnswers).length;

    if (answeredCount < lesson5Quiz.length) {
      setLesson5QuizValidationError(false);
      setLessonActionMessage(
        `Please answer all ${lesson5Quiz.length} questions before submitting the RDS quiz.`
      );
      return;
    }

    setLesson5QuizValidationError(false);

    let score = 0;

    lesson5Quiz.forEach((question, index) => {
      if (lesson5QuizAnswers[index] === question.answer) {
        score += 1;
      }
    });

    setLesson5QuizScore(score);
    setLesson5QuizSubmitted(true);

    if (score >= quizPassScore) {
      setLesson5QuizPassed(true);
      setLessonActionMessage(
        `🎉 RDS quiz passed! You scored ${score}/${lesson5Quiz.length}. You can now complete Lesson 5.`
      );
    } else {
      setLesson5QuizPassed(false);
      setLessonActionMessage(
        `You scored ${score}/${lesson5Quiz.length}. You need at least ${quizPassScore}/${lesson5Quiz.length} to pass. Review the lesson and try again.`
      );
    }

    setTimeout(() => {
      document.getElementById("lesson5-quiz")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  };

  const handleLesson5QuizRetry = () => {
    setLesson5QuizAnswers({});
    setLesson5QuizSubmitted(false);
    setLesson5QuizScore(0);
    setLesson5QuizPassed(false);
    setLessonActionMessage("");

    document.getElementById("lesson5-quiz")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleAuthChange = (event) => {
    setAuthForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    setAuthMessage("");

    try {
      const response = await fetch(`${API_URL}/api/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: authForm.email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAuthMessage(data.message || "Unable to send reset link");
        setLoading(false);
        return;
      }

      setAuthMessage(
        data.message ||
          "If an account with that email exists, a password reset link has been sent."
      );
    } catch (error) {
      console.error("Forgot password error:", error);
      setAuthMessage("Unable to connect to server");
    }

    setLoading(false);
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (resetForm.password.length < 6) {
      setAuthMessage("Password must be at least 6 characters");
      return;
    }

    if (resetForm.password !== resetForm.confirmPassword) {
      setAuthMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setAuthMessage("");

    try {
      const response = await fetch(`${API_URL}/api/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: resetToken,
          password: resetForm.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAuthMessage(data.message || "Unable to reset password");
        setLoading(false);
        return;
      }

      setResetForm({
        password: "",
        confirmPassword: "",
      });

      setResetToken("");
      window.history.replaceState({}, document.title, window.location.pathname);

      setAuthForm({
        name: "",
        email: "",
        password: "",
      });

      setAuthMode("login");
      setAuthMessage("Password reset successful. You can now login.");
    } catch (error) {
      console.error("Reset password error:", error);
      setAuthMessage("Unable to connect to server");
    }

    setLoading(false);
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setAuthMessage("");

    const endpoint = authMode === "register" ? "/api/register" : "/api/login";

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authForm),
      });
      const data = await response.json();

      if (!response.ok) {
        setAuthMessage(data.message || "Authentication failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("educloud_token", data.token);
      setUser(data.user);
      setAuthForm({ name: "", email: "", password: "" });
      setAuthMode(null);
      setAuthMessage("");
    } catch (error) {
      console.error("Authentication error:", error);
      setAuthMessage("Unable to connect to server");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("educloud_token");
    setUser(null);
    setCompletedLessons([]);
    setSelectedLesson(null);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizPassed(false);
  };

  const handleLessonSelect = (lesson) => {
    if (!lesson) return;
    setSelectedLesson(lesson);
    setTimeout(() => {
      document.getElementById("lesson-viewer")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const handleQuizAnswer = (questionIndex, optionIndex) => {
    if (quizSubmitted) return;
    setQuizAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));
    setLessonActionMessage("");
  };

  const handleQuizSubmit = () => {
    const answeredCount = Object.keys(quizAnswers).length;

    if (answeredCount < lesson1Quiz.length) {
      setLessonActionMessage(
        `Please answer all ${lesson1Quiz.length} questions before submitting the quiz.`
      );
      return;
    }

    let score = 0;
    lesson1Quiz.forEach((question, index) => {
      if (quizAnswers[index] === question.answer) score += 1;
    });

    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= quizPassScore) {
      setQuizPassed(true);
      setLessonActionMessage(
        `🎉 Quiz passed! You scored ${score}/${lesson1Quiz.length}. You can now complete Lesson 1.`
      );
    } else {
      setQuizPassed(false);
      setLessonActionMessage(
        `You scored ${score}/${lesson1Quiz.length}. You need at least ${quizPassScore}/${lesson1Quiz.length} to pass. Review the lesson and try again.`
      );
    }

    setTimeout(() => {
      document.getElementById("lesson1-quiz")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  };

  const handleQuizRetry = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizPassed(false);
    setLessonActionMessage("");
    document.getElementById("lesson1-quiz")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleLesson2QuizAnswer = (questionIndex, optionIndex) => {
    if (lesson2QuizSubmitted) return;

    setLesson2QuizAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));

    setLessonActionMessage("");
  };

  const handleLesson2QuizSubmit = () => {
    const answeredCount = Object.keys(lesson2QuizAnswers).length;

    if (answeredCount < lesson2Quiz.length) {
      setLessonActionMessage(
        `Please answer all ${lesson2Quiz.length} questions before submitting the EC2 quiz.`
      );
      return;
    }

    let score = 0;

    lesson2Quiz.forEach((question, index) => {
      if (lesson2QuizAnswers[index] === question.answer) {
        score += 1;
      }
    });

    setLesson2QuizScore(score);
    setLesson2QuizSubmitted(true);

    if (score >= quizPassScore) {
      setLesson2QuizPassed(true);
      setLessonActionMessage(
        `🎉 EC2 quiz passed! You scored ${score}/${lesson2Quiz.length}. You can now complete Lesson 2.`
      );
    } else {
      setLesson2QuizPassed(false);
      setLessonActionMessage(
        `You scored ${score}/${lesson2Quiz.length}. You need at least ${quizPassScore}/${lesson2Quiz.length} to pass. Review the lesson and try again.`
      );
    }

    setTimeout(() => {
      document.getElementById("lesson2-quiz")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  };

  const handleLesson2QuizRetry = () => {
    setLesson2QuizAnswers({});
    setLesson2QuizSubmitted(false);
    setLesson2QuizScore(0);
    setLesson2QuizPassed(false);
    setLessonActionMessage("");

    document.getElementById("lesson2-quiz")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleLesson3QuizAnswer = (questionIndex, optionIndex) => {
    if (lesson3QuizSubmitted) return;

    setLesson3QuizAnswers((previous) => ({
      ...previous,
      [questionIndex]: optionIndex,
    }));

    setLessonActionMessage("");
  };

  const handleLesson3QuizSubmit = () => {
    const answeredCount = Object.keys(lesson3QuizAnswers).length;

    if (answeredCount < lesson3Quiz.length) {
      setLessonActionMessage(
        `Please answer all ${lesson3Quiz.length} questions before submitting the S3 quiz.`
      );
      return;
    }

    let score = 0;

    lesson3Quiz.forEach((question, index) => {
      if (lesson3QuizAnswers[index] === question.answer) {
        score += 1;
      }
    });

    setLesson3QuizScore(score);
    setLesson3QuizSubmitted(true);

    if (score >= quizPassScore) {
      setLesson3QuizPassed(true);
      setLessonActionMessage(
        `🎉 S3 quiz passed! You scored ${score}/${lesson3Quiz.length}. You can now complete Lesson 3.`
      );
    } else {
      setLesson3QuizPassed(false);
      setLessonActionMessage(
        `You scored ${score}/${lesson3Quiz.length}. You need at least ${quizPassScore}/${lesson3Quiz.length} to pass. Review the lesson and try again.`
      );
    }

    setTimeout(() => {
      document.getElementById("lesson3-quiz")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  };

  const handleLesson3QuizRetry = () => {
    setLesson3QuizAnswers({});
    setLesson3QuizSubmitted(false);
    setLesson3QuizScore(0);
    setLesson3QuizPassed(false);
    setLessonActionMessage("");

    document.getElementById("lesson3-quiz")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleLesson4QuizAnswer = (questionIndex, optionIndex) => {
  if (lesson4QuizSubmitted) return;

  setLesson4QuizAnswers((previous) => ({
    ...previous,
    [questionIndex]: optionIndex,
  }));

  setLessonActionMessage("");
};

const handleLesson4QuizSubmit = () => {
  const answeredCount = Object.keys(lesson4QuizAnswers).length;

  if (answeredCount < lesson4Quiz.length) {
    setLessonActionMessage(
      `Please answer all ${lesson4Quiz.length} questions before submitting the IAM quiz.`
    );
    return;
  }

  let score = 0;

  lesson4Quiz.forEach((question, index) => {
    if (lesson4QuizAnswers[index] === question.answer) {
      score += 1;
    }
  });

  setLesson4QuizScore(score);
  setLesson4QuizSubmitted(true);

  if (score >= quizPassScore) {
    setLesson4QuizPassed(true);
    setLessonActionMessage(
      `🎉 IAM quiz passed! You scored ${score}/${lesson4Quiz.length}. You can now complete Lesson 4.`
    );
  } else {
    setLesson4QuizPassed(false);
    setLessonActionMessage(
      `You scored ${score}/${lesson4Quiz.length}. You need at least ${quizPassScore}/${lesson4Quiz.length} to pass. Review the lesson and try again.`
    );
  }

  setTimeout(() => {
    document.getElementById("lesson4-quiz")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 50);
};

const handleLesson4QuizRetry = () => {
  setLesson4QuizAnswers({});
  setLesson4QuizSubmitted(false);
  setLesson4QuizScore(0);
  setLesson4QuizPassed(false);
  setLessonActionMessage("");

  document.getElementById("lesson4-quiz")?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};

const handleNextLesson = async () => {
    if (!selectedLesson) return;

    // Linux and Python lessons use local string IDs, not backend lesson IDs.
    if (selectedCourse?.id === 2 || selectedCourse?.id === 3) {
      const currentId = selectedLesson.id;
      setCompletedLessons((previous) =>
        previous.includes(currentId) ? previous : [...previous, currentId]
      );
      setLessonActionMessage("");

      const currentIndex = lessons.findIndex((lesson) => lesson.id === currentId);
      if (currentIndex >= 0 && currentIndex < lessons.length - 1) {
        setSelectedLesson(lessons[currentIndex + 1]);
        setTimeout(() => {
          document.getElementById("lesson-viewer")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else {
        setLessonActionMessage("🎉 Course completed! Great work.");
      }
      return;
    }

    const isAlreadyCompleted = completedLessons.includes(selectedLesson.id);


  if (selectedLesson.id === 4 && !isAlreadyCompleted && !lesson4QuizPassed) {
    setLessonActionMessage(
      `Complete the IAM quiz first. You need ${quizPassScore}/${lesson4Quiz.length} correct answers to unlock lesson completion.`
    );
    document.getElementById("lesson4-quiz")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    return;
  }

  if (selectedLesson.id === 5 && !isAlreadyCompleted && !lesson5QuizPassed) {
    setLessonActionMessage(
      `Complete the RDS quiz first. You need ${quizPassScore}/${lesson5Quiz.length} correct answers to unlock lesson completion.`
    );
    document.getElementById("lesson5-quiz")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    return;
  }

  if (selectedLesson.id === 6 && !isAlreadyCompleted && !lesson6QuizPassed) {
    setLessonActionMessage(
      `Complete the VPC quiz first. You need ${quizPassScore}/${lesson6Quiz.length} correct answers to unlock lesson completion.`
    );
    document.getElementById("lesson6-quiz")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    return;
  }

  if (selectedLesson.id === 7 && !isAlreadyCompleted && !lesson7QuizPassed) {
    setLessonActionMessage(
      `Complete the Load Balancer + Auto Scaling quiz first. You need ${quizPassScore}/${lesson7Quiz.length} correct answers to unlock lesson completion.`
    );
    document.getElementById("lesson7-quiz")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    return;
  }

  if (selectedLesson.id === 8 && !isAlreadyCompleted && !lesson8QuizPassed) {
    setLessonActionMessage(
      `Complete the CloudWatch quiz first. You need ${quizPassScore}/${lesson8Quiz.length} correct answers to unlock lesson completion.`
    );
    document.getElementById("lesson8-quiz")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    return;
  }

  if (selectedLesson.id === 9 && !isAlreadyCompleted && !lesson9QuizPassed) {
    setLessonActionMessage(
      `Complete the Lambda quiz first. You need ${quizPassScore}/${lesson9Quiz.length} correct answers to unlock lesson completion.`
    );
    document.getElementById("lesson9-quiz")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    return;
  }

  if (selectedLesson.id === 10 && !isAlreadyCompleted && !lesson10QuizPassed) {
    setLessonActionMessage(
      `Complete the CloudFront quiz first. You need ${quizPassScore}/${lesson10Quiz.length} correct answers to unlock lesson completion.`
    );
    document.getElementById("lesson10-quiz")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    return;
  }


    if (selectedLesson.id === 1 && !isAlreadyCompleted && !quizPassed) {
      setLessonActionMessage(
        `Complete the AWS Fundamentals quiz first. You need ${quizPassScore}/${lesson1Quiz.length} correct answers to unlock lesson completion.`
      );
      document.getElementById("lesson1-quiz")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    if (selectedLesson.id === 2 && !isAlreadyCompleted && !lesson2QuizPassed) {
      setLessonActionMessage(
        `Complete the EC2 quiz first. You need ${quizPassScore}/${lesson2Quiz.length} correct answers to unlock lesson completion.`
      );
      document.getElementById("lesson2-quiz")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    if (selectedLesson.id === 3 && !isAlreadyCompleted && !lesson3QuizPassed) {
      setLessonActionMessage(
        `Complete the S3 quiz first. You need ${quizPassScore}/${lesson3Quiz.length} correct answers to unlock lesson completion.`
      );
      document.getElementById("lesson3-quiz")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    if (!user) {
      setAuthMode("login");
      setAuthMessage("Please login to save your learning progress.");
      return;
    }

    const token = localStorage.getItem("educloud_token");
    if (!token) {
      setAuthMode("login");
      setAuthMessage("Please login to save your learning progress.");
      return;
    }

    try {
      setProgressLoading(true);
      setLessonActionMessage("");

      const response = await fetch(`${API_URL}/api/progress/${selectedLesson.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save lesson progress");
      }

      setCompletedLessons((previous) =>
        previous.includes(selectedLesson.id) ? previous : [...previous, selectedLesson.id]
      );

      const currentIndex = lessons.findIndex((lesson) => lesson.id === selectedLesson.id);

      if (currentIndex >= 0 && currentIndex < lessons.length - 1) {
        const nextLesson = lessons[currentIndex + 1];
        setSelectedLesson(nextLesson);
        setTimeout(() => {
          document.getElementById("lesson-viewer")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else {
        setLessonActionMessage("🎉 Course completed! Great work.");
      }
    } catch (error) {
      console.error("Save progress error:", error);
      setLessonActionMessage(error.message || "Unable to save lesson progress");
    } finally {
      setProgressLoading(false);
    }
  };

  const completedCurrentCourse = lessons.filter((lesson) => completedLessons.includes(lesson.id));
  const courseProgress = lessons.length
    ? Math.round((completedCurrentCourse.length / lessons.length) * 100)
    : 0;

  const handleStartLearning = () => {
    if (!user) {
      setAuthMode("register");
      setAuthMessage("");
      return;
    }

    if (lessons.length > 0) handleLessonSelect(selectedLesson || lessons[0]);
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="container nav-inner">
          <div className="logo">
            <span className="logo-mark">E</span>
            <span>EduCloud</span>
          </div>

          <nav>
            <a href="#home">Home</a>
            <a href="#courses">Courses</a>
            <a href="#why">Why EduCloud</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
          </nav>

          <div className="nav-actions">
            {user ? (
              <>
                <span className="user-name">Hi, {user.name}</span>
                <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button className="btn btn-outline" onClick={() => { setAuthMode("login"); setAuthMessage(""); }}>
                  Login
                </button>
                <button className="btn btn-primary" onClick={() => { setAuthMode("register"); setAuthMessage(""); }}>
                  Start Learning
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="eyebrow">LEARN • BUILD • DEPLOY</span>
              <h1>Build real skills.<br />Deploy real projects.</h1>
              <p>
                Learn AWS, Linux, DevOps and Python through practical projects designed
                to build real-world technical skills.
              </p>

              <div className="hero-buttons">
                <button
                  className="btn btn-primary btn-large"
                  onClick={() => {
                    if (!user) {
                      setAuthMode("register");
                      return;
                    }
                    document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {user ? "Explore Courses" : "Start Learning"}
                </button>

                <a href="#courses" className="btn btn-outline btn-large">Explore Courses</a>
              </div>

              <div className="hero-trust">
                <span>✓ Practical learning</span>
                <span>✓ AWS based projects</span>
                <span>✓ Beginner friendly</span>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-top">
                <div>
                  <span className="small-label">YOUR LEARNING</span>
                  <h3>{user ? `${user.name}'s Dashboard` : "Dashboard"}</h3>
                </div>
                <div className="dashboard-icon">☁️</div>
              </div>

              <div className="progress-box">
                <div className="progress-heading">
                  <span>AWS Cloud Fundamentals</span>
                  <strong>{selectedCourse?.id === 1 ? `${courseProgress}%` : "68%"}</strong>
                </div>

                <div className="progress-bar">
                  <span style={{ width: selectedCourse?.id === 1 ? `${courseProgress}%` : "68%" }}></span>
                </div>
                <p>Continue learning →</p>
              </div>

              <div className="dashboard-stats">
                <div>
                  <strong>{selectedCourse?.id === 1 ? lessons.length : "12"}</strong>
                  <span>Lessons</span>
                </div>
                <div><strong>4</strong><span>Projects</span></div>
                <div>
                  <strong>{selectedCourse?.id === 1 ? `${courseProgress}%` : "68%"}</strong>
                  <span>Progress</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="container stats-grid">
            <div><strong>3+</strong><span>Learning Paths</span></div>
            <div><strong>10+</strong><span>Practical Projects</span></div>
            <div><strong>AWS</strong><span>Cloud Based</span></div>
            <div><strong>100%</strong><span>Hands-on Focus</span></div>
          </div>
        </section>

        <section className="section" id="courses">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">LEARNING PATHS</span>
                <h2>Learn skills that matter</h2>
              </div>
              <p>
                Structured learning paths with practical exercises and real deployment experience.
              </p>
            </div>

            <div className="course-grid">
              {courses.map((course) => (
                <article className="course-card" key={course.id}>
                  <div className="course-icon">{course.icon}</div>
                  <span className="course-label">LEARNING PATH</span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <button
                    className="course-link"
                    onClick={() => {
                      setSelectedCourse(course);
                      setTimeout(() => {
                        document.getElementById("course-details")?.scrollIntoView({ behavior: "smooth" });
                      }, 50);
                    }}
                  >
                    Explore course →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {selectedCourse && (
          <section className="section course-details" id="course-details">
            <div className="container">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">COURSE DETAILS</span>
                  <h2>{selectedCourse.icon} {selectedCourse.title}</h2>
                </div>
                <p>{selectedCourse.description}</p>
              </div>

              <div className="dashboard-stats">
                <div><strong>{lessons.length}</strong><span>Lessons</span></div>
                <div><strong>4</strong><span>Projects</span></div>
                <div><strong>{courseProgress}%</strong><span>Your Progress</span></div>
              </div>

              <div className="lessons-list">
                <h3>Course Lessons</h3>

                {lessons.length === 0 ? (
                  <p>No lessons available for this course yet.</p>
                ) : (
                  lessons.map((lesson) => {
                    const meta = lessonMeta[lesson.lesson_order] || {
                      image: "/lesson-icons/aws.svg",
                      type: "Lesson",
                      duration: "~ 20 min",
                      className: "aws",
                    };
                    const linuxIcons = ["🐧", "📁", "👥", "🌐", "⌨️", "🌿", "🐳", "🔄"];
                    const courseIcon =
                      selectedCourse.id === 2
                        ? lesson.icon || linuxIcons[(Number(lesson.lesson_order) || 1) - 1] || "🐧"
                        : selectedCourse.id === 3
                        ? lesson.icon || "🐍"
                        : null;
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isSelected = selectedLesson?.id === lesson.id;

                    return (
                      <button
                        type="button"
                        className={`lesson-card ${meta.className} ${isSelected ? "selected" : ""} ${isCompleted ? "completed" : ""}`}
                        key={lesson.id}
                        onClick={() => handleLessonSelect(lesson)}
                      >
                        <div className="lesson-visual">
                          {courseIcon ? (
                            <span className="lesson-course-emoji" role="img" aria-label={lesson.title}>{courseIcon}</span>
                          ) : (
                            <img src={meta.image} alt={lesson.title} />
                          )}
                        </div>

                        <div className="lesson-card-content">
                          <span className="lesson-badge">Lesson {lesson.lesson_order}</span>
                          <h4>
                            {lesson.title}
                            {isCompleted && <span style={{ marginLeft: "8px", color: "#16a34a" }}>✓</span>}
                          </h4>

                          <p>
                            {lesson.lesson_order === 1
                              ? "Start your AWS journey and understand the basics of cloud computing."
                              : lesson.lesson_order === 2
                              ? "Learn how EC2 provides virtual servers for running applications."
                              : lesson.lesson_order === 3
                              ? "Understand Amazon S3 and how cloud object storage works."
                              : lesson.lesson_order === 4
                              ? "Learn IAM users, permissions and secure access to AWS resources."
                              : lesson.lesson_order === 5
                              ? "Learn how Amazon RDS provides managed relational databases in AWS."
                              : "Learn practical concepts through this lesson."}
                          </p>

                          <div className="lesson-meta">
                            <span>▶ {meta.type}</span>
                            <span className="meta-divider">|</span>
                            <span>◷ {meta.duration}</span>
                          </div>
                        </div>

                        <div className="lesson-open">
                          {isCompleted ? "Completed ✓" : "Open Lesson →"}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              <button className="btn btn-primary btn-large" onClick={handleStartLearning}>
                Start Learning →
              </button>

              {selectedLesson && (
                <div className="lesson-viewer" id="lesson-viewer">
                  <span className="eyebrow">CURRENT LESSON</span>
                  <span className="lesson-number">Lesson {selectedLesson.lesson_order}</span>
                  <h3>{selectedLesson.title}</h3>

                  <div className="progress-box">
                    <div className="progress-heading">
                      <span>Course Progress</span>
                      <strong>{progressLoading ? "..." : `${courseProgress}%`}</strong>
                    </div>
                    <div className="progress-bar">
                      <span style={{ width: `${courseProgress}%` }}></span>
                    </div>
                  </div>

                  {selectedCourse?.id === 2 || selectedCourse?.id === 3 ? (
                    <ExtraCourseLesson
                      key={selectedLesson.id}
                      lesson={selectedLesson}
                      courseId={selectedCourse.id}
                      completed={completedLessons.includes(selectedLesson.id)}
                      isLastLesson={selectedLesson.id === lessons[lessons.length - 1]?.id}
                      onComplete={handleNextLesson}
                    />
                  ) : selectedLesson?.id === 1 ? (
                    <div className="lesson1-page">
                      <section className="lesson1-hero">
                        <div className="lesson1-hero-icon">☁️</div>
                        <div className="lesson1-hero-content">
                          <span className="lesson1-kicker">MISSION 01 · AWS FUNDAMENTALS</span>
                          <h4>Welcome to AWS — Your Cloud Journey Starts Here!</h4>
                          <p>
                            Your cloud journey starts here. Learn how the cloud works and understand
                            the AWS services used to build real applications.
                          </p>
                          <div className="lesson1-hero-tags">
                            <span>☁️ Cloud</span><span>🚀 Beginner</span><span>⏱ ~15 min</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🎬 THE STORY</div>
                        <h4>Imagine this...</h4>
                        <p>You built an amazing website. Suddenly, 10,000 people visit it at the same time.</p>
                        <div className="lesson1-quote">"Bro... I cannot handle this! 😭"</div>
                        <p>
                          You need servers, storage, networking and security. Buying physical servers
                          is expensive and managing them is a headache.
                        </p>
                      </section>

                      <section className="lesson1-aws-banner">
                        <div className="lesson1-aws-icon">☁️</div>
                        <div>
                          <div className="lesson1-banner-label">ENTER AWS</div>
                          <h4>Amazon Web Services</h4>
                          <p>
                            AWS lets you use computing resources over the internet instead of buying
                            and managing physical servers.
                          </p>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🎯 YOUR FIRST MISSION</div>
                        <h4>You are now the cloud engineer.</h4>
                        <p>
                          A startup needs a website, file storage, user accounts and a database.
                          Choose the right AWS service.
                        </p>

                        <div className="lesson1-services">
                          <div className="lesson1-service"><div className="service-icon">🖥️</div><strong>EC2</strong><span>Virtual Servers</span></div>
                          <div className="lesson1-service"><div className="service-icon">📦</div><strong>S3</strong><span>Cloud Storage</span></div>
                          <div className="lesson1-service"><div className="service-icon">🗄️</div><strong>RDS</strong><span>Database</span></div>
                          <div className="lesson1-service"><div className="service-icon">🔐</div><strong>IAM</strong><span>Permissions</span></div>
                          <div className="lesson1-service"><div className="service-icon">🌐</div><strong>VPC</strong><span>Networking</span></div>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🧠 AWS BASICS</div>
                        <h4>4 concepts you must know</h4>

                        <div className="lesson1-concepts">
                          <div className="lesson1-concept">
                            <div className="concept-icon">🌍</div>
                            <h5>Region</h5>
                            <p>A geographic area containing AWS infrastructure.</p>
                            <strong>Region = Geographic area</strong>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">🏢</div>
                            <h5>Availability Zone</h5>
                            <p>An isolated location inside an AWS Region.</p>
                            <strong>AZ = Isolated location</strong>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">🖥️</div>
                            <h5>EC2</h5>
                            <p>Virtual servers used to run applications.</p>
                            <strong>EC2 = Compute</strong>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">📦</div>
                            <h5>S3</h5>
                            <p>Cloud object storage for files, images and backups.</p>
                            <strong>S3 = Storage</strong>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-challenge" id="lesson1-quiz">
                        <div className="lesson1-challenge-content" style={{ width: "100%" }}>
                          <div className="extra-lesson-section-label">🎯 KNOWLEDGE CHECK</div>
                          <p className="extra-lesson-muted">Answer every question. You need at least 80% to pass.</p>
                          <form className="extra-lesson-quiz" onSubmit={(event) => { event.preventDefault(); handleQuizSubmit(); }}>
                            {lesson1Quiz.map((question, questionIndex) => {
                              const selectedAnswer = quizAnswers[questionIndex];
                              const correct = question.answer === selectedAnswer;
                              return (
                                <fieldset className="extra-lesson-question" key={question.question}>
                                  <legend>{questionIndex + 1}. {question.question}</legend>
                                  <div className="extra-lesson-options">
                                    {question.options.map((option, optionIndex) => {
                                      const isSelected = selectedAnswer === optionIndex;
                                      const isCorrect = quizSubmitted && optionIndex === question.answer;
                                      const isWrongSelected = quizSubmitted && isSelected && !correct;
                                      return (
                                        <label className={`extra-lesson-option${isSelected ? " is-selected" : ""}${isCorrect ? " is-correct" : ""}${isWrongSelected ? " is-incorrect" : ""}`} key={option}>
                                          <input type="radio" name={`aws-lesson1-question-${questionIndex}`} value={optionIndex} checked={isSelected} disabled={quizSubmitted} onChange={() => handleQuizAnswer(questionIndex, optionIndex)} />
                                          <span>{option}{isCorrect ? " ✓" : isWrongSelected ? " ✕" : ""}</span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                  {quizSubmitted && <p className="extra-lesson-explanation"><strong>{correct ? "Correct! " : "Review this one. "}</strong>{question.explanation}</p>}
                                </fieldset>
                              );
                            })}
                            {lessonActionMessage && <div className="lesson5-validation-message" style={{ marginTop: "12px", padding: "12px 14px", borderRadius: "10px", background: quizPassed ? "#f0fdf4" : "#fff7ed", color: quizPassed ? "#166534" : "#9a3412", fontWeight: 600 }}>{lessonActionMessage}</div>}
                            {!quizSubmitted ? (
                              <button type="submit" className="btn btn-primary" disabled={Object.keys(quizAnswers).length !== lesson1Quiz.length}>Submit quiz →</button>
                            ) : (
                              <div className={`extra-lesson-result${quizPassed ? " is-passed" : " is-failed"}`} role="status">
                                <strong>{quizPassed ? "🎉 Quiz passed!" : "Keep practising"}</strong>
                                <p>You scored {quizScore}/{lesson1Quiz.length}. {quizPassed ? "You can now complete this lesson." : "Review the explanations and try again."}</p>
                                {!quizPassed && <button type="button" className="btn btn-primary" onClick={handleQuizRetry}>Try again</button>}
                              </div>
                            )}
                          </form>
                        </div>
                      </section>
                      <section className="lesson1-takeaways">
                        <div className="lesson1-section-label">🏆 KEY TAKEAWAYS</div>
                        <div className="lesson1-takeaway-grid">
                          <div>🖥️ EC2 <span>Compute</span></div>
                          <div>📦 S3 <span>Storage</span></div>
                          <div>🗄️ RDS <span>Database</span></div>
                          <div>🔐 IAM <span>Permissions</span></div>
                          <div>🌐 VPC <span>Networking</span></div>
                          <div>🌍 Region <span>Location</span></div>
                        </div>
                      </section>

                      <section className="lesson1-next">
                        <div>
                          <span>🔥 NEXT MISSION</span>
                          <h4>AWS EC2 — Your First Cloud Server</h4>
                          <p>Get ready to enter the server room. 🖥️☁️</p>
                        </div>
                        <div className="lesson1-next-icon">→</div>
                      </section>
                    </div>
                  ) : selectedLesson?.id === 2 ? (
                    <div className="lesson1-page">
                      <section className="lesson1-hero">
                        <div className="lesson1-hero-icon">🖥️</div>
                        <div className="lesson1-hero-content">
                          <span className="lesson1-kicker">MISSION 02 · AWS EC2</span>
                          <h4>AWS EC2 — Your First Cloud Server</h4>
                          <p>
                            Learn how Amazon EC2 gives you virtual servers in the cloud
                            and how to prepare one for running real applications.
                          </p>
                          <div className="lesson1-hero-tags">
                            <span>🖥️ Compute</span>
                            <span>🚀 Beginner</span>
                            <span>⏱ ~20 min</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🎬 THE STORY</div>
                        <h4>Imagine you need your own server...</h4>
                        <p>
                          Your startup has a Node.js application and thousands of users
                          need to access it. You need a computer that stays online and
                          can run your application.
                        </p>

                        <div className="lesson1-quote">
                          "But I don't want to buy and maintain a physical server!"
                        </div>

                        <p>
                          This is where Amazon EC2 comes in. AWS lets you create a
                          virtual server in minutes instead of buying physical hardware.
                        </p>
                      </section>

                      <section className="lesson1-aws-banner">
                        <div className="lesson1-aws-icon">🖥️</div>
                        <div>
                          <div className="lesson1-banner-label">ENTER EC2</div>
                          <h4>Amazon Elastic Compute Cloud</h4>
                          <p>
                            EC2 provides resizable compute capacity in the AWS cloud.
                            An EC2 instance is a virtual server that can run applications,
                            websites and backend services.
                          </p>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🧠 EC2 BASICS</div>
                        <h4>What happens when you launch an EC2 instance?</h4>

                        <div className="lesson1-concepts">
                          <div className="lesson1-concept">
                            <div className="concept-icon">💿</div>
                            <h5>AMI</h5>
                            <p>
                              A template containing the software information needed
                              to launch an EC2 instance.
                            </p>
                            <strong>AMI = Server template</strong>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">⚙️</div>
                            <h5>Instance Type</h5>
                            <p>
                              Determines the compute, memory and other resources
                              available to your virtual server.
                            </p>
                            <strong>Type = Server resources</strong>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">🔑</div>
                            <h5>Key Pair</h5>
                            <p>
                              Used to securely authenticate when connecting to
                              supported EC2 instances.
                            </p>
                            <strong>Key Pair = Secure access</strong>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">🛡️</div>
                            <h5>Security Group</h5>
                            <p>
                              Controls which network traffic is allowed to and from
                              the EC2 instance.
                            </p>
                            <strong>SG = Virtual firewall</strong>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🌐 NETWORKING</div>
                        <h4>Public IP vs Private IP</h4>

                        <div className="lesson1-services">
                          <div className="lesson1-service">
                            <div className="service-icon">🌍</div>
                            <strong>Public IP</strong>
                            <span>Internet reachable address</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">🏠</div>
                            <strong>Private IP</strong>
                            <span>Internal network address</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">🛡️</div>
                            <strong>Security Group</strong>
                            <span>Controls network traffic</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">🔌</div>
                            <strong>Port</strong>
                            <span>Application entry point</span>
                          </div>
                        </div>

                        <p style={{ marginTop: "18px" }}>
                          For example, an application might listen on port 80 for HTTP,
                          while SSH commonly uses port 22. The Security Group determines
                          whether traffic to those ports is allowed.
                        </p>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🚀 YOUR FIRST EC2 MISSION</div>
                        <h4>Launch the cloud server mindset</h4>

                        <p>
                          Imagine you are deploying the EduCloud backend. Your basic
                          EC2 setup would follow this flow:
                        </p>

                        <div className="lesson1-services">
                          <div className="lesson1-service">
                            <div className="service-icon">1️⃣</div>
                            <strong>Choose AMI</strong>
                            <span>Example: Ubuntu</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">2️⃣</div>
                            <strong>Choose Type</strong>
                            <span>Select resources</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">3️⃣</div>
                            <strong>Configure Access</strong>
                            <span>Key pair + Security Group</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">4️⃣</div>
                            <strong>Launch</strong>
                            <span>Start your instance</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-challenge" id="lesson2-quiz">
  <div className="lesson1-challenge-content" style={{ width: "100%" }}>
    <div className="extra-lesson-section-label">EC2 KNOWLEDGE CHECK</div>
    <h4>Pass the quiz to unlock Lesson 2 completion</h4>
    <p className="extra-lesson-muted">Answer every question. You need at least 80% to pass.</p>
    <form className="extra-lesson-quiz" onSubmit={(event) => { event.preventDefault(); handleLesson2QuizSubmit(); }}>
      {lesson2Quiz.map((question, questionIndex) => {
        const selectedAnswer = lesson2QuizAnswers[questionIndex];
        const correct = question.answer === selectedAnswer;
        return (
          <fieldset className="extra-lesson-question" key={question.question}>
            <legend>{questionIndex + 1}. {question.question}</legend>
            <div className="extra-lesson-options">
              {question.options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === optionIndex;
                const isCorrect = lesson2QuizSubmitted && optionIndex === question.answer;
                const isWrongSelected = lesson2QuizSubmitted && isSelected && !correct;
                return (
                  <label className={`extra-lesson-option${isSelected ? " is-selected" : ""}${isCorrect ? " is-correct" : ""}${isWrongSelected ? " is-incorrect" : ""}`} key={option}>
                    <input type="radio" name={`aws-lesson2-question-${questionIndex}`} value={optionIndex} checked={isSelected} disabled={lesson2QuizSubmitted} onChange={() => handleLesson2QuizAnswer(questionIndex, optionIndex)} />
                    <span>{option}{isCorrect ? " ✓" : isWrongSelected ? " ✕" : ""}</span>
                  </label>
                );
              })}
            </div>
            {lesson2QuizSubmitted && <p className="extra-lesson-explanation"><strong>{correct ? "Correct! " : "Review this one. "}</strong>{question.explanation}</p>}
          </fieldset>
        );
      })}
      {lessonActionMessage && selectedLesson?.id === 2 && (
        <div className="lesson5-validation-message" style={{ marginTop: "12px", padding: "12px 14px", borderRadius: "10px", background: lesson2QuizPassed ? "#f0fdf4" : "#fff7ed", color: lesson2QuizPassed ? "#166534" : "#9a3412", fontWeight: 600 }}>
          {lessonActionMessage}
        </div>
      )}
      {!lesson2QuizSubmitted ? (
        <button type="submit" className="btn btn-primary" disabled={Object.keys(lesson2QuizAnswers).length !== lesson2Quiz.length}>Submit EC2 Quiz →</button>
      ) : (
        <div className={`extra-lesson-result${lesson2QuizPassed ? " is-passed" : " is-failed"}`} role="status">
          <strong>{lesson2QuizPassed ? "🎉 Quiz passed!" : "Keep practising"}</strong>
          <p>You scored {lesson2QuizScore}/{lesson2Quiz.length}. {lesson2QuizPassed ? "You can now complete this lesson." : "Review the explanations and try again."}</p>
          {!lesson2QuizPassed && <button type="button" className="btn btn-primary" onClick={handleLesson2QuizRetry}>Try again</button>}
        </div>
      )}
    </form>
  </div>
</section>

<section className="lesson1-takeaways">
                        <div className="lesson1-section-label">🏆 KEY TAKEAWAYS</div>

                        <div className="lesson1-takeaway-grid">
                          <div>🖥️ EC2 <span>Compute</span></div>
                          <div>💿 AMI <span>Template</span></div>
                          <div>⚙️ Type <span>Resources</span></div>
                          <div>🔑 Key Pair <span>Access</span></div>
                          <div>🛡️ Security Group <span>Firewall</span></div>
                          <div>🌍 Public IP <span>Internet</span></div>
                        </div>
                      </section>

                      <section className="lesson1-next">
                        <div>
                          <span>🔥 NEXT MISSION</span>
                          <h4>AWS S3 — Your Cloud Storage</h4>
                          <p>Next, learn how to store files in the cloud. 📦☁️</p>
                        </div>
                        <div className="lesson1-next-icon">→</div>
                      </section>
                    </div>
                  ) : selectedLesson?.id === 3 ? (
                    <div className="lesson1-page">
                      <section className="lesson1-hero">
                        <div className="lesson1-hero-icon">🪣</div>
                        <div className="lesson1-hero-content">
                          <span className="lesson1-kicker">MISSION 03 · AWS S3</span>
                          <h4>AWS S3 — Your Cloud Storage</h4>
                          <p>
                            Learn how Amazon S3 stores files, images, backups and
                            other data as highly durable objects in the cloud.
                          </p>
                          <div className="lesson1-hero-tags">
                            <span>🪣 Storage</span>
                            <span>🚀 Beginner</span>
                            <span>⏱ ~18 min</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🎬 THE STORY</div>
                        <h4>Imagine your application needs to store files...</h4>
                        <p>
                          Your EduCloud platform has user profile images, course
                          documents, certificates and backups. Storing all of these
                          files directly on your application server quickly becomes
                          difficult.
                        </p>
                        <div className="lesson1-quote">
                          "Where should we keep all these files safely?"
                        </div>
                        <p>
                          Amazon S3 gives you a scalable place to store and retrieve
                          files without managing the underlying storage hardware.
                        </p>
                      </section>

                      <section className="lesson1-aws-banner">
                        <div className="lesson1-aws-icon">🪣</div>
                        <div>
                          <div className="lesson1-banner-label">ENTER S3</div>
                          <h4>Amazon Simple Storage Service</h4>
                          <p>
                            Amazon S3 is an object storage service designed to store
                            and retrieve any amount of data from anywhere on the web.
                          </p>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🧠 S3 BASICS</div>
                        <h4>Understand the storage model</h4>

                        <div className="lesson1-concepts">
                          <div className="lesson1-concept">
                            <div className="concept-icon">🪣</div>
                            <h5>Bucket</h5>
                            <p>
                              A container that holds objects stored in Amazon S3.
                            </p>
                            <strong>Bucket = Container</strong>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">📄</div>
                            <h5>Object</h5>
                            <p>
                              A file and its associated metadata stored inside a bucket.
                            </p>
                            <strong>Object = Stored data</strong>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">🌍</div>
                            <h5>Region</h5>
                            <p>
                              The AWS geographic region where an S3 bucket is created.
                            </p>
                            <strong>Region = Location</strong>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">🔐</div>
                            <h5>Access Control</h5>
                            <p>
                              Permissions and policies determine who can access S3 data.
                            </p>
                            <strong>Access = Security</strong>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">📦 HOW S3 WORKS</div>
                        <h4>Bucket → Object → Access</h4>

                        <div className="lesson1-services">
                          <div className="lesson1-service">
                            <div className="service-icon">1️⃣</div>
                            <strong>Create Bucket</strong>
                            <span>Choose a unique bucket name</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">2️⃣</div>
                            <strong>Upload Object</strong>
                            <span>Store a file or data object</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">3️⃣</div>
                            <strong>Set Access</strong>
                            <span>Control who can access it</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">4️⃣</div>
                            <strong>Retrieve</strong>
                            <span>Download or use the object</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🔐 SECURITY</div>
                        <h4>Public vs Private S3 Data</h4>

                        <div className="lesson1-services">
                          <div className="lesson1-service">
                            <div className="service-icon">🔒</div>
                            <strong>Private</strong>
                            <span>Access restricted by permissions</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">🌐</div>
                            <strong>Public</strong>
                            <span>Only when intentionally configured</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">👤</div>
                            <strong>IAM</strong>
                            <span>Controls AWS identity permissions</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">📜</div>
                            <strong>Bucket Policy</strong>
                            <span>Defines bucket resource access</span>
                          </div>
                        </div>

                        <p style={{ marginTop: "18px" }}>
                          A common beginner mistake is assuming that every S3 object
                          is public. S3 access should be configured deliberately,
                          especially when storing private user or application data.
                        </p>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🚀 YOUR S3 MISSION</div>
                        <h4>Store EduCloud files in the cloud</h4>
                        <p>
                          Imagine EduCloud needs to store course PDFs, profile images
                          and generated certificates. A simple S3 workflow would be:
                        </p>

                        <div className="lesson1-services">
                          <div className="lesson1-service">
                            <div className="service-icon">🪣</div>
                            <strong>Create Bucket</strong>
                            <span>educloud-assets</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">📤</div>
                            <strong>Upload Files</strong>
                            <span>Images, PDFs and assets</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">🔐</div>
                            <strong>Protect Data</strong>
                            <span>Use appropriate permissions</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">📥</div>
                            <strong>Retrieve</strong>
                            <span>Application accesses objects</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-challenge" id="lesson3-quiz">
  <div className="lesson1-challenge-content" style={{ width: "100%" }}>
    <div className="extra-lesson-section-label">S3 KNOWLEDGE CHECK</div>
    <h4>Pass the quiz to unlock Lesson 3 completion</h4>
    <p className="extra-lesson-muted">
      Answer all {lesson3Quiz.length} questions. You need at least {quizPassScore}/{lesson3Quiz.length} correct answers.
    </p>

    <div className="extra-lesson-quiz">
      {lesson3Quiz.map((question, questionIndex) => {
        const selectedAnswer = lesson3QuizAnswers[questionIndex];
        const correct = question.answer === selectedAnswer;

        return (
          <fieldset className="extra-lesson-question" key={question.question}>
            <legend>{questionIndex + 1}. {question.question}</legend>
            <div className="extra-lesson-options">
              {question.options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === optionIndex;
                const isCorrect = lesson3QuizSubmitted && optionIndex === question.answer;
                const isWrongSelected = lesson3QuizSubmitted && isSelected && !correct;

                return (
                  <label
                    className={`extra-lesson-option${isSelected ? " is-selected" : ""}${isCorrect ? " is-correct" : ""}${isWrongSelected ? " is-incorrect" : ""}`}
                    key={option}
                  >
                    <input
                      type="radio"
                      name={`aws-lesson3-question-${questionIndex}`}
                      value={optionIndex}
                      checked={isSelected}
                      disabled={lesson3QuizSubmitted}
                      onChange={() => handleLesson3QuizAnswer(questionIndex, optionIndex)}
                    />
                    <span>
                      {String.fromCharCode(65 + optionIndex)}) {option}
                      {isCorrect ? " ✓" : isWrongSelected ? " ✕" : ""}
                    </span>
                  </label>
                );
              })}
            </div>

            {lesson3QuizSubmitted && (
              <p className="extra-lesson-explanation">
                <strong>{correct ? "Correct! " : "Review this one. "}</strong>
                {question.explanation}
              </p>
            )}
          </fieldset>
        );
      })}

      {lessonActionMessage && selectedLesson?.id === 3 && (
        <div
          className="lesson5-validation-message"
          style={{
            marginTop: "12px",
            padding: "12px 14px",
            borderRadius: "10px",
            background: lesson3QuizPassed ? "#f0fdf4" : "#fff7ed",
            color: lesson3QuizPassed ? "#166534" : "#9a3412",
            fontWeight: 600,
          }}
        >
          {lessonActionMessage}
        </div>
      )}

      {!lesson3QuizSubmitted ? (
        <button type="button" className="btn btn-primary" onClick={handleLesson3QuizSubmit}>
          Submit S3 Quiz →
        </button>
      ) : (
        <div className={`extra-lesson-result${lesson3QuizPassed ? " is-passed" : " is-failed"}`} role="status">
          <strong>{lesson3QuizPassed ? "🎉 Quiz passed!" : "Keep practising"}</strong>
          <p>
            You scored {lesson3QuizScore}/{lesson3Quiz.length}.{" "}
            {lesson3QuizPassed ? "You can now complete this lesson." : "Review the explanations and try again."}
          </p>
          {!lesson3QuizPassed && (
            <button type="button" className="btn btn-primary" onClick={handleLesson3QuizRetry}>
              Try again
            </button>
          )}
        </div>
      )}
    </div>
  </div>
</section>

                      <section className="lesson1-takeaways">
                        <div className="lesson1-section-label">
                          🏆 KEY TAKEAWAYS
                        </div>

                        <div className="lesson1-takeaway-grid">
                          <div>
                            🪣 S3 <span>Storage</span>
                          </div>
                          <div>
                            📦 Bucket <span>Container</span>
                          </div>
                          <div>
                            📄 Object <span>Data</span>
                          </div>
                          <div>
                            🌍 Region <span>Location</span>
                          </div>
                          <div>
                            🔐 Access <span>Security</span>
                          </div>
                          <div>
                            💾 Backup <span>Durable storage</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-next">
                        <div>
                          <span>🔥 NEXT MISSION</span>
                          <h4>AWS IAM — Secure Your Cloud</h4>
                          <p>
                            Next, learn how AWS identities and permissions
                            control access to your resources. 🔐☁️
                          </p>
                        </div>

                        <div className="lesson1-next-icon">→</div>
                      </section>
                    </div>
                  ) : selectedLesson?.id === 4 ? (
                    <div className="lesson1-page">

                      <section className="lesson1-hero">
                        <div className="lesson1-hero-icon">🔐</div>
                        <div className="lesson1-hero-content">
                          <span className="lesson1-kicker">MISSION 04 · AWS IAM</span>
                          <h4>AWS IAM — Secure Your Cloud</h4>
                          <p>
                            Learn how AWS identities, permissions and security
                            controls protect access to your cloud resources.
                          </p>
                          <div className="lesson1-hero-tags">
                            <span>🔐 Security</span>
                            <span>🚀 Beginner</span>
                            <span>⏱ ~20 min</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🎬 THE STORY</div>
                        <h4>Imagine this...</h4>
                        <p>
                          Your EduCloud application is growing. Developers,
                          administrators and applications all need access to AWS.
                        </p>
                        <p>
                          But should everyone be allowed to access everything?
                          Definitely not.
                        </p>
                        <div className="lesson1-quote">
                          "Bro... why does everyone have admin access? 😭"
                        </div>
                        <p>
                          AWS IAM helps you decide who can access your resources
                          and exactly what they are allowed to do.
                        </p>
                      </section>

                      <section className="lesson1-aws-banner">
                        <div className="lesson1-aws-icon">🔐</div>
                        <div>
                          <div className="lesson1-banner-label">ENTER IAM</div>
                          <h4>Identity and Access Management</h4>
                          <p>
                            IAM lets you securely manage identities and control
                            access to AWS resources.
                          </p>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🧠 IAM BASICS</div>
                        <h4>4 concepts you must know</h4>

                        <div className="lesson1-concepts">
                          <div className="lesson1-concept">
                            <div className="concept-icon">👤</div>
                            <h5>Users</h5>
                            <p>
                              Identities that can represent people or applications
                              that need AWS access.
                            </p>
                            <strong>User = Identity</strong>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">👥</div>
                            <h5>Groups</h5>
                            <p>
                              Collections of IAM users that can share common
                              permissions.
                            </p>
                            <strong>Group = Collection</strong>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">📜</div>
                            <h5>Policies</h5>
                            <p>
                              Documents that define which AWS actions are allowed
                              or denied.
                            </p>
                            <strong>Policy = Permissions</strong>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">🎭</div>
                            <h5>Roles</h5>
                            <p>
                              Identities that can be assumed to obtain permissions
                              for a task.
                            </p>
                            <strong>Role = Temporary Access</strong>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🔗 HOW ACCESS WORKS</div>
                        <h4>Identity → Permission → Resource</h4>

                        <div className="lesson1-services">
                          <div className="lesson1-service">
                            <div className="service-icon">👤</div>
                            <strong>Identity</strong>
                            <span>User, group or role</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">📜</div>
                            <strong>Policy</strong>
                            <span>Allowed or denied actions</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">☁️</div>
                            <strong>Resource</strong>
                            <span>EC2, S3, RDS and more</span>
                          </div>
                        </div>

                        <div className="lesson1-quote">
                          💡 Access should always be intentional.
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🛡️ SECURITY PRINCIPLE</div>
                        <h4>Least Privilege</h4>
                        <p>
                          Give an identity only the permissions it actually needs
                          to perform its task.
                        </p>

                        <div className="lesson1-services">
                          <div className="lesson1-service">
                            <div className="service-icon">❌</div>
                            <strong>Too Much Access</strong>
                            <span>Everyone gets administrator permissions</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">✅</div>
                            <strong>Least Privilege</strong>
                            <span>Only required permissions are granted</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🚨 ROOT USER SECURITY</div>
                        <h4>Protect the AWS Root User</h4>
                        <p>
                          The AWS root user has extremely broad access to the
                          account and should not be used for everyday tasks.
                        </p>

                        <div className="lesson1-services">
                          <div className="lesson1-service">
                            <div className="service-icon">🔑</div>
                            <strong>Protect Credentials</strong>
                            <span>Keep root credentials secure</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">📱</div>
                            <strong>Enable MFA</strong>
                            <span>Add an extra security layer</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">👤</div>
                            <strong>Use IAM</strong>
                            <span>Use IAM identities for normal work</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🎯 YOUR MISSION</div>
                        <h4>Secure EduCloud</h4>
                        <p>
                          You are now responsible for designing a safer access
                          model for the EduCloud AWS environment.
                        </p>

                        <div className="lesson1-services">
                          <div className="lesson1-service">
                            <div className="service-icon">01</div>
                            <strong>Create identities</strong>
                            <span>Give people and services appropriate identities</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">02</div>
                            <strong>Assign permissions</strong>
                            <span>Grant only the access required</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">03</div>
                            <strong>Protect credentials</strong>
                            <span>Use strong authentication and MFA</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">04</div>
                            <strong>Review access</strong>
                            <span>Regularly check permissions</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-challenge" id="lesson4-quiz">
  <div className="lesson1-challenge-content" style={{ width: "100%" }}>
    <div className="extra-lesson-section-label">AWS IAM SECURITY QUIZ</div>
    <h4>Pass the quiz to unlock Lesson 4 completion</h4>
    <p className="extra-lesson-muted">
      Answer all {lesson4Quiz.length} questions. You need at least {quizPassScore}/{lesson4Quiz.length} correct answers.
    </p>

    <form className="extra-lesson-quiz" onSubmit={(event) => { event.preventDefault(); handleLesson4QuizSubmit(); }}>
      {lesson4Quiz.map((question, questionIndex) => {
        const selectedAnswer = lesson4QuizAnswers[questionIndex];
        const correct = question.answer === selectedAnswer;

        return (
          <fieldset className="extra-lesson-question" key={question.question}>
            <legend>{questionIndex + 1}. {question.question}</legend>
            <div className="extra-lesson-options">
              {question.options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === optionIndex;
                const isCorrect = lesson4QuizSubmitted && optionIndex === question.answer;
                const isWrongSelected = lesson4QuizSubmitted && isSelected && !correct;

                return (
                  <label
                    className={`extra-lesson-option${isSelected ? " is-selected" : ""}${isCorrect ? " is-correct" : ""}${isWrongSelected ? " is-incorrect" : ""}`}
                    key={option}
                  >
                    <input
                      type="radio"
                      name={`aws-lesson4-question-${questionIndex}`}
                      value={optionIndex}
                      checked={isSelected}
                      disabled={lesson4QuizSubmitted}
                      onChange={() => handleLesson4QuizAnswer(questionIndex, optionIndex)}
                    />
                    <span>
                      {option}
                      {isCorrect ? " ✓" : isWrongSelected ? " ✕" : ""}
                    </span>
                  </label>
                );
              })}
            </div>

            {lesson4QuizSubmitted && (
              <p className="extra-lesson-explanation">
                <strong>{correct ? "Correct! " : "Review this one. "}</strong>
                {question.explanation}
              </p>
            )}
          </fieldset>
        );
      })}

      {lessonActionMessage && selectedLesson?.id === 4 && (
        <div
          className="lesson5-validation-message"
          style={{
            marginTop: "12px",
            padding: "12px 14px",
            borderRadius: "10px",
            background: lesson4QuizPassed ? "#f0fdf4" : "#fff7ed",
            color: lesson4QuizPassed ? "#166534" : "#9a3412",
            fontWeight: 600,
          }}
        >
          {lessonActionMessage}
        </div>
      )}

      {!lesson4QuizSubmitted ? (
        <button type="submit" className="btn btn-primary" disabled={Object.keys(lesson4QuizAnswers).length !== lesson4Quiz.length}>
          Submit IAM Quiz →
        </button>
      ) : (
        <div className={`extra-lesson-result${lesson4QuizPassed ? " is-passed" : " is-failed"}`} role="status">
          <strong>{lesson4QuizPassed ? "🎉 Quiz passed!" : "Keep practising"}</strong>
          <p>
            You scored {lesson4QuizScore}/{lesson4Quiz.length}.{" "}
            {lesson4QuizPassed ? "You can now complete this lesson." : "Review the explanations and try again."}
          </p>
          {!lesson4QuizPassed && (
            <button type="button" className="btn btn-primary" onClick={handleLesson4QuizRetry}>
              Try again
            </button>
          )}
        </div>
      )}
    </form>
  </div>
</section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">📌 KEY TAKEAWAYS</div>
                        <h4>Remember these IAM rules</h4>

                        <div className="lesson1-concepts">
                          <div className="lesson1-concept">
                            <div className="concept-icon">🔐</div>
                            <h5>IAM</h5>
                            <p>Controls access to AWS resources.</p>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">📜</div>
                            <h5>Policies</h5>
                            <p>Define what actions are allowed or denied.</p>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">🛡️</div>
                            <h5>Least Privilege</h5>
                            <p>Give only the permissions that are needed.</p>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">📱</div>
                            <h5>MFA</h5>
                            <p>Add stronger protection to important identities.</p>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-next-mission">
                        <div className="lesson1-next-label">MISSION COMPLETE</div>
                        <h4>You now understand AWS IAM.</h4>
                        <p>
                          You have learned how AWS identities and permissions
                          protect cloud resources.
                        </p>
                        <div className="lesson1-next-icon">🔐</div>
                      </section>

                    </div>
                  ) : selectedLesson?.id === 5 ? (
                    <div className="lesson1-content">
                      <section className="lesson1-hero">
                        <div className="lesson1-hero-icon">🗄️</div>

                        <div className="lesson1-hero-content">
                          <span className="lesson1-kicker">
                            MISSION 05 · AWS RDS
                          </span>

                          <h4>AWS RDS — Your Managed Database</h4>

                          <p>
                            Learn how Amazon RDS makes it easier to run,
                            secure, back up and manage relational databases
                            in the AWS cloud.
                          </p>

                          <div className="lesson1-hero-tags">
                            <span>🗄️ Database</span>
                            <span>🚀 Beginner</span>
                            <span>⏱ ~20 min</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card lesson5-section">
                        <span className="content-label">01 · THE BIG IDEA</span>

                        <h3>What is Amazon RDS?</h3>

                        <p>
                          Amazon RDS is a managed service for running
                          relational databases in AWS. Instead of managing
                          every database infrastructure task yourself, AWS
                          handles many common operational tasks for you.
                        </p>

                        <div className="lesson1-card-grid">
                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">🗃️</div>
                            <h4>Relational Database</h4>
                            <p>
                              Store structured data using tables, rows and
                              relationships.
                            </p>
                          </div>

                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">⚙️</div>
                            <h4>Managed Service</h4>
                            <p>
                              AWS takes care of many infrastructure and
                              database administration tasks.
                            </p>
                          </div>

                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">🛡️</div>
                            <h4>Built for Security</h4>
                            <p>
                              Network access can be controlled using
                              Security Groups and other AWS security tools.
                            </p>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card lesson5-section">
                        <span className="content-label">02 · DATABASE ENGINES</span>

                        <h3>Choose the database engine you need</h3>

                        <p>
                          Amazon RDS supports several popular relational
                          database engines, including PostgreSQL, MySQL,
                          MariaDB, Oracle and SQL Server.
                        </p>

                        <div className="lesson1-code-card">
                          <div className="lesson1-code-header">
                            <span>RDS ENGINE EXAMPLES</span>
                            <span>DATABASE</span>
                          </div>

                          <pre>{`PostgreSQL
MySQL
MariaDB
Oracle
SQL Server`}</pre>
                        </div>
                      </section>

                      <section className="lesson1-card lesson5-section">
                        <span className="content-label">03 · RDS vs EC2</span>

                        <h3>Why use RDS instead of managing a database yourself?</h3>

                        <div className="lesson1-card-grid">
                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">🖥️</div>
                            <h4>Database on EC2</h4>
                            <p>
                              You manage the server, operating system,
                              database installation and many maintenance tasks.
                            </p>
                          </div>

                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">☁️</div>
                            <h4>Amazon RDS</h4>
                            <p>
                              AWS manages much of the underlying infrastructure
                              so you can focus more on your application and data.
                            </p>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card lesson5-section">
                        <span className="content-label">04 · BACKUPS & SECURITY</span>

                        <h3>Protect your database</h3>

                        <div className="lesson1-card-grid">
                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">💾</div>
                            <h4>Automated Backups</h4>
                            <p>
                              Backups help protect database data and support
                              recovery when data needs to be restored.
                            </p>
                          </div>

                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">🔒</div>
                            <h4>Security Groups</h4>
                            <p>
                              Security Groups control which network traffic
                              is allowed to reach your RDS instance.
                            </p>
                          </div>

                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">📍</div>
                            <h4>Private Access</h4>
                            <p>
                              Database network access should be designed
                              carefully so only required systems can connect.
                            </p>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card lesson5-section">
                        <span className="content-label">05 · EDUCloud MISSION</span>

                        <h3>Connect your application to a managed database</h3>

                        <div className="lesson1-step-list">
                          <div className="lesson5-step">
                            <span>01</span>
                            <div>
                              <strong>Create an RDS database</strong>
                              <p>
                                Choose a supported relational database engine
                                such as PostgreSQL.
                              </p>
                            </div>
                          </div>

                          <div className="lesson5-step">
                            <span>02</span>
                            <div>
                              <strong>Configure network access</strong>
                              <p>
                                Use Security Groups to allow only the required
                                application traffic.
                              </p>
                            </div>
                          </div>

                          <div className="lesson5-step">
                            <span>03</span>
                            <div>
                              <strong>Connect your application</strong>
                              <p>
                                Configure your backend with the database host,
                                port, database name and credentials.
                              </p>
                            </div>
                          </div>

                          <div className="lesson5-step">
                            <span>04</span>
                            <div>
                              <strong>Protect your data</strong>
                              <p>
                                Use backups, strong credentials and appropriate
                                network permissions.
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-challenge lesson5-quiz" id="lesson5-quiz">
  <div className="lesson1-challenge-content" style={{ width: "100%" }}>
    <div className="extra-lesson-section-label">RDS KNOWLEDGE CHECK</div>
    <h4>Pass the quiz to unlock Lesson 5 completion</h4>
    <p className="extra-lesson-muted">
      Answer all {lesson5Quiz.length} questions. You need at least {quizPassScore}/{lesson5Quiz.length} correct answers.
    </p>
    <form className="extra-lesson-quiz" onSubmit={(event) => { event.preventDefault(); handleLesson5QuizSubmit(); }}>
      {lesson5Quiz.map((question, questionIndex) => {
        const selectedAnswer = lesson5QuizAnswers[questionIndex];
        const correct = question.answer === selectedAnswer;
        return (
          <fieldset className="extra-lesson-question" key={question.question}>
            <legend>{questionIndex + 1}. {question.question}</legend>
            <div className="extra-lesson-options">
              {question.options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === optionIndex;
                const isCorrect = lesson5QuizSubmitted && optionIndex === question.answer;
                const isWrongSelected = lesson5QuizSubmitted && isSelected && !correct;
                return (
                  <label className={`extra-lesson-option${isSelected ? " is-selected" : ""}${isCorrect ? " is-correct" : ""}${isWrongSelected ? " is-incorrect" : ""}`} key={option}>
                    <input type="radio" name={`aws-lesson5-question-${questionIndex}`} value={optionIndex} checked={isSelected} disabled={lesson5QuizSubmitted} onChange={() => handleLesson5QuizAnswer(questionIndex, optionIndex)} />
                    <span>{option}{isCorrect ? " ✓" : isWrongSelected ? " ✕" : ""}</span>
                  </label>
                );
              })}
            </div>
            {lesson5QuizSubmitted && <p className="extra-lesson-explanation"><strong>{correct ? "Correct! " : "Review this one. "}</strong>{question.explanation}</p>}
          </fieldset>
        );
      })}
      {lessonActionMessage && selectedLesson?.id === 5 && (
        <div className="lesson5-validation-message" role="status">{lessonActionMessage}</div>
      )}
      {!lesson5QuizSubmitted ? (
        <button type="submit" className="btn btn-primary" disabled={Object.keys(lesson5QuizAnswers).length !== lesson5Quiz.length}>Submit RDS Quiz →</button>
      ) : (
        <div className={`extra-lesson-result${lesson5QuizPassed ? " is-passed" : " is-failed"}`} role="status">
          <strong>{lesson5QuizPassed ? "🎉 Quiz passed!" : "Keep practising"}</strong>
          <p>You scored {lesson5QuizScore}/{lesson5Quiz.length}. {lesson5QuizPassed ? "You can now complete this lesson." : "Review the explanations and try again."}</p>
          {!lesson5QuizPassed && <button type="button" className="btn btn-primary" onClick={handleLesson5QuizRetry}>Try again</button>}
        </div>
      )}
    </form>
  </div>
</section>

                      <section className="lesson1-card lesson5-section">
                        <span className="content-label">🎯 KEY TAKEAWAYS</span>

                        <div className="lesson1-takeaway-box">
                          <div>✓ RDS is a managed relational database service.</div>
                          <div>✓ RDS supports engines such as PostgreSQL and MySQL.</div>
                          <div>✓ AWS manages many common database infrastructure tasks.</div>
                          <div>✓ Security Groups control network access to RDS.</div>
                          <div>✓ Backups help protect database data.</div>
                        </div>
                      </section>
                    </div>
                  ) : selectedLesson?.id === 6 ? (
                    <div className="lesson1-content">
                      <section className="lesson1-hero">
                        <div className="lesson1-hero-icon">🌐</div>

                        <div className="lesson1-hero-content">
                          <span className="lesson1-kicker">
                            MISSION 06 · AWS VPC
                          </span>

                          <h4>AWS VPC — Build Your Private Cloud Network</h4>

                          <p>
                            Learn how Amazon VPC creates an isolated network
                            environment where you control subnets, routing,
                            internet access and network security.
                          </p>

                          <div className="lesson1-hero-tags">
                            <span>🌐 Networking</span>
                            <span>🚀 Beginner</span>
                            <span>⏱ ~20 min</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card lesson5-section">
                        <span className="content-label">01 · THE BIG IDEA</span>

                        <h3>What is Amazon VPC?</h3>

                        <p>
                          Amazon Virtual Private Cloud, or VPC, lets you create
                          a logically isolated network inside AWS. You decide
                          how resources are organized and how they communicate.
                        </p>

                        <div className="lesson1-card-grid">
                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">🏠</div>
                            <h4>Isolated Network</h4>
                            <p>
                              Build your own private network space for AWS
                              resources.
                            </p>
                          </div>

                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">🧩</div>
                            <h4>Subnets</h4>
                            <p>
                              Divide your VPC into smaller network segments
                              for different workloads.
                            </p>
                          </div>

                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">🛡️</div>
                            <h4>Network Control</h4>
                            <p>
                              Control routing and network access between your
                              AWS resources.
                            </p>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card lesson5-section">
                        <span className="content-label">02 · VPC COMPONENTS</span>

                        <h3>The building blocks of a VPC</h3>

                        <div className="lesson1-card-grid">
                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">📦</div>
                            <h4>VPC</h4>
                            <p>
                              The main network boundary that contains your
                              AWS resources.
                            </p>
                          </div>

                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">🔲</div>
                            <h4>Subnets</h4>
                            <p>
                              Network segments inside a VPC. They can be
                              public or private depending on routing.
                            </p>
                          </div>

                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">🛣️</div>
                            <h4>Route Tables</h4>
                            <p>
                              Rules that determine where network traffic
                              should go.
                            </p>
                          </div>

                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">🌍</div>
                            <h4>Internet Gateway</h4>
                            <p>
                              Provides a path between a VPC and the public
                              internet when routing is configured correctly.
                            </p>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card lesson5-section">
                        <span className="content-label">03 · PUBLIC VS PRIVATE</span>

                        <h3>Understand public and private subnets</h3>

                        <div className="lesson1-code-card">
                          <div className="lesson1-code-header">
                            <span>VPC NETWORK DESIGN</span>
                            <span>EXAMPLE</span>
                          </div>

                          <pre>{`VPC
├── Public Subnet
│   └── Web Server / Load Balancer
│
└── Private Subnet
    └── Application / Database`}</pre>
                        </div>

                        <p>
                          A subnet is considered public when its route table
                          provides a route to an Internet Gateway. Private
                          subnets do not have a direct route to the internet
                          through an Internet Gateway.
                        </p>
                      </section>

                      <section className="lesson1-card lesson5-section">
                        <span className="content-label">04 · ROUTING</span>

                        <h3>How does traffic move?</h3>

                        <div className="lesson1-step-list">
                          <div className="lesson5-step">
                            <span>01</span>
                            <div>
                              <strong>Request enters the network</strong>
                              <p>
                                A client sends traffic toward an AWS resource.
                              </p>
                            </div>
                          </div>

                          <div className="lesson5-step">
                            <span>02</span>
                            <div>
                              <strong>Route table is checked</strong>
                              <p>
                                The subnet uses its route table to determine
                                the next destination.
                              </p>
                            </div>
                          </div>

                          <div className="lesson5-step">
                            <span>03</span>
                            <div>
                              <strong>Traffic reaches its destination</strong>
                              <p>
                                AWS networking components forward the traffic
                                according to the configured routes.
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card lesson5-section">
                        <span className="content-label">05 · EDUCloud MISSION</span>

                        <h3>Design a simple three-tier network</h3>

                        <div className="lesson1-card-grid">
                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">🌍</div>
                            <h4>Public Layer</h4>
                            <p>
                              Place internet-facing components such as a load
                              balancer in public subnets when required.
                            </p>
                          </div>

                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">⚙️</div>
                            <h4>Application Layer</h4>
                            <p>
                              Keep application servers in private subnets when
                              they do not need direct internet access.
                            </p>
                          </div>

                          <div className="lesson1-info-card">
                            <div className="lesson1-card-icon">🗄️</div>
                            <h4>Database Layer</h4>
                            <p>
                              Keep databases such as RDS in private network
                              locations whenever possible.
                            </p>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-challenge lesson5-quiz lesson6-quiz" id="lesson6-quiz">
  <div className="lesson1-challenge-content" style={{ width: "100%" }}>
    <div className="extra-lesson-section-label">VPC KNOWLEDGE CHECK</div>
    <h4>Pass the quiz to unlock Lesson 6 completion</h4>
    <p className="extra-lesson-muted">
      Answer all {lesson6Quiz.length} questions. You need at least {quizPassScore}/{lesson6Quiz.length} correct answers.
    </p>
    <form className="extra-lesson-quiz" onSubmit={(event) => { event.preventDefault(); handleLesson6QuizSubmit(); }}>
      {lesson6Quiz.map((question, questionIndex) => {
        const selectedAnswer = lesson6QuizAnswers[questionIndex];
        const correct = question.answer === selectedAnswer;
        return (
          <fieldset className="extra-lesson-question" key={question.question}>
            <legend>{questionIndex + 1}. {question.question}</legend>
            <div className="extra-lesson-options">
              {question.options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === optionIndex;
                const isCorrect = lesson6QuizSubmitted && optionIndex === question.answer;
                const isWrongSelected = lesson6QuizSubmitted && isSelected && !correct;
                return (
                  <label className={`extra-lesson-option${isSelected ? " is-selected" : ""}${isCorrect ? " is-correct" : ""}${isWrongSelected ? " is-incorrect" : ""}`} key={option}>
                    <input type="radio" name={`aws-lesson6-question-${questionIndex}`} value={optionIndex} checked={isSelected} disabled={lesson6QuizSubmitted} onChange={() => handleLesson6QuizAnswer(questionIndex, optionIndex)} />
                    <span>{option}{isCorrect ? " ✓" : isWrongSelected ? " ✕" : ""}</span>
                  </label>
                );
              })}
            </div>
            {lesson6QuizSubmitted && <p className="extra-lesson-explanation"><strong>{correct ? "Correct! " : "Review this one. "}</strong>{question.explanation}</p>}
          </fieldset>
        );
      })}
      {lessonActionMessage && selectedLesson?.id === 6 && (
        <div className="lesson6-validation-message" role="status">{lessonActionMessage}</div>
      )}
      {!lesson6QuizSubmitted ? (
        <button type="submit" className="btn btn-primary" disabled={Object.keys(lesson6QuizAnswers).length !== lesson6Quiz.length}>Submit VPC Quiz →</button>
      ) : (
        <div className={`extra-lesson-result${lesson6QuizPassed ? " is-passed" : " is-failed"}`} role="status">
          <strong>{lesson6QuizPassed ? "🎉 Quiz passed!" : "Keep practising"}</strong>
          <p>You scored {lesson6QuizScore}/{lesson6Quiz.length}. {lesson6QuizPassed ? "You can now complete this lesson." : "Review the explanations and try again."}</p>
          {!lesson6QuizPassed && <button type="button" className="btn btn-primary" onClick={handleLesson6QuizRetry}>Try again</button>}
        </div>
      )}
    </form>
  </div>
</section>

                      <section className="lesson1-card lesson5-section">
                        <span className="content-label">🎯 KEY TAKEAWAYS</span>

                        <div className="lesson1-takeaway-box">
                          <div>✓ VPC creates an isolated AWS network.</div>
                          <div>✓ Subnets divide a VPC into network segments.</div>
                          <div>✓ Route tables control where traffic is sent.</div>
                          <div>✓ Internet Gateways provide internet connectivity for configured public routing.</div>
                          <div>✓ Private subnets are useful for application and database workloads.</div>
                        </div>
                      </section>
                    </div>
                  ) : selectedLesson?.id === 7 ? (
                    <div className="lesson1-content lesson7-content">
                      <section className="lesson1-hero">
                        <div className="lesson1-hero-icon">⚖️</div>

                        <div className="lesson1-hero-content">
                          <span className="lesson1-kicker">
                            MISSION 07 · AWS LOAD BALANCING
                          </span>

                          <h4>AWS Load Balancer + Auto Scaling — Handle More Traffic</h4>

                          <p>
                            Learn how AWS distributes incoming traffic across servers
                            and automatically adjusts capacity when demand changes.
                          </p>

                          <div className="lesson1-hero-tags">
                            <span>⚖️ Scalability</span>
                            <span>🚀 Beginner</span>
                            <span>⏱ ~20 min</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card lesson5-section">
                        <span className="content-label">🚦 THE BIG IDEA</span>
                        <h3>Don't let one server handle everything.</h3>
                        <p>
                          When an application becomes popular, one EC2 instance may
                          not be enough. A Load Balancer distributes requests across
                          healthy servers, while Auto Scaling can add or remove EC2
                          instances based on demand.
                        </p>
                      </section>

                      <section className="lesson1-card lesson5-section lesson7-visual-card">
                        <span className="content-label">⚖️ LOAD BALANCER</span>
                        <h3>Traffic gets distributed across healthy targets.</h3>

                        <div className="lesson7-flow">
                          <div className="lesson7-flow-node">👥<strong>Users</strong><small>Incoming traffic</small></div>
                          <div className="lesson7-flow-arrow">→</div>
                          <div className="lesson7-flow-node lesson7-primary">⚖️<strong>Load Balancer</strong><small>Distributes requests</small></div>
                          <div className="lesson7-flow-arrow">→</div>
                          <div className="lesson7-server-grid">
                            <div className="lesson7-flow-node">🖥️<strong>EC2-1</strong><small>Healthy</small></div>
                            <div className="lesson7-flow-node">🖥️<strong>EC2-2</strong><small>Healthy</small></div>
                            <div className="lesson7-flow-node">🖥️<strong>EC2-3</strong><small>Healthy</small></div>
                          </div>
                        </div>

                        <div className="lesson1-takeaway-box">
                          <div>✓ Users send requests to the Load Balancer.</div>
                          <div>✓ The Load Balancer checks registered targets.</div>
                          <div>✓ Traffic is distributed across healthy instances.</div>
                          <div>✓ Unhealthy targets can be removed from normal traffic.</div>
                        </div>
                      </section>

                      <section className="lesson1-card lesson5-section lesson7-visual-card">
                        <span className="content-label">📈 AUTO SCALING</span>
                        <h3>Automatically adjust compute capacity.</h3>
                        <p>
                          An Auto Scaling Group maintains the required number of EC2
                          instances. It can launch additional instances when demand
                          increases and terminate instances when demand decreases.
                        </p>

                        <div className="lesson7-scaling-visual">
                          <div className="lesson7-capacity-card">
                            <span>MIN</span>
                            <strong>2</strong>
                            <small>Minimum instances</small>
                          </div>

                          <div className="lesson7-capacity-card lesson7-capacity-active">
                            <span>DESIRED</span>
                            <strong>3</strong>
                            <small>Normal capacity</small>
                          </div>

                          <div className="lesson7-capacity-card">
                            <span>MAX</span>
                            <strong>6</strong>
                            <small>Maximum instances</small>
                          </div>
                        </div>

                        <div className="lesson1-takeaway-box">
                          <div>1️⃣ Minimum capacity — the lowest desired number of instances.</div>
                          <div>2️⃣ Desired capacity — the normal number of running instances.</div>
                          <div>3️⃣ Maximum capacity — the upper scaling limit.</div>
                        </div>
                      </section>

                      <section className="lesson1-card lesson5-section lesson7-visual-card">
                        <span className="content-label">🔄 HOW THEY WORK TOGETHER</span>
                        <h3>Load Balancer + Auto Scaling</h3>

                        <div className="lesson7-architecture">
                          <div className="lesson7-architecture-step">
                            <span>01</span>
                            <div className="lesson7-architecture-icon">👥</div>
                            <strong>User Traffic</strong>
                            <small>Requests enter the application.</small>
                          </div>

                          <div className="lesson7-architecture-line">→</div>

                          <div className="lesson7-architecture-step lesson7-highlight">
                            <span>02</span>
                            <div className="lesson7-architecture-icon">⚖️</div>
                            <strong>Load Balancer</strong>
                            <small>Routes traffic to healthy targets.</small>
                          </div>

                          <div className="lesson7-architecture-line">→</div>

                          <div className="lesson7-architecture-step">
                            <span>03</span>
                            <div className="lesson7-architecture-icon">🖥️</div>
                            <strong>EC2 Fleet</strong>
                            <small>Multiple instances serve requests.</small>
                          </div>

                          <div className="lesson7-architecture-line">→</div>

                          <div className="lesson7-architecture-step lesson7-scale">
                            <span>04</span>
                            <div className="lesson7-architecture-icon">📈</div>
                            <strong>Auto Scaling</strong>
                            <small>Adds or removes capacity as demand changes.</small>
                          </div>
                        </div>

                        <div className="lesson1-takeaway-box">
                          <div>① User traffic reaches the Load Balancer.</div>
                          <div>② Load Balancer sends requests to healthy EC2 instances.</div>
                          <div>③ Traffic increases and Auto Scaling launches more instances.</div>
                          <div>④ New healthy instances can receive traffic.</div>
                          <div>⑤ Traffic falls and Auto Scaling can reduce capacity.</div>
                        </div>
                      </section>

                      <section className="lesson1-card lesson5-section">
                        <span className="content-label">🎯 EDUCloud MISSION</span>
                        <h3>Build a scalable web application</h3>
                        <p>
                          Imagine EduCloud suddenly gets thousands of learners.
                          Instead of relying on one EC2 server, place a Load Balancer
                          in front of multiple EC2 instances and let Auto Scaling
                          adjust the number of instances as traffic changes.
                        </p>

                        <div className="lesson7-mission-visual">
                          <div className="lesson7-mission-node">🌍<strong>Internet</strong><small>Learner requests</small></div>
                          <div className="lesson7-mission-arrow">↓</div>
                          <div className="lesson7-mission-node lesson7-mission-primary">⚖️<strong>Application Load Balancer</strong><small>Distributes traffic</small></div>
                          <div className="lesson7-mission-arrow">↓</div>
                          <div className="lesson7-mission-servers">
                            <div>🖥️ EC2-1</div>
                            <div>🖥️ EC2-2</div>
                            <div>🖥️ EC2-3</div>
                          </div>
                          <div className="lesson7-mission-arrow">↕</div>
                          <div className="lesson7-mission-node lesson7-mission-scale">📈<strong>Auto Scaling</strong><small>Adjusts capacity</small></div>
                        </div>
                      </section>

                      <section className="lesson1-challenge lesson7-quiz" id="lesson7-quiz">
  <div className="lesson1-challenge-content" style={{ width: "100%" }}>
    <div className="extra-lesson-section-label">LOAD BALANCER + AUTO SCALING KNOWLEDGE CHECK</div>
    <h4>Pass the quiz to unlock Lesson 7 completion</h4>
    <p className="extra-lesson-muted">
      Answer all {lesson7Quiz.length} questions. You need at least {quizPassScore}/{lesson7Quiz.length} correct answers.
    </p>
    <form className="extra-lesson-quiz" onSubmit={(event) => { event.preventDefault(); handleLesson7QuizSubmit(); }}>
      {lesson7Quiz.map((question, questionIndex) => {
        const selectedAnswer = lesson7QuizAnswers[questionIndex];
        const correct = question.answer === selectedAnswer;
        return (
          <fieldset className="extra-lesson-question" key={question.question}>
            <legend>{questionIndex + 1}. {question.question}</legend>
            <div className="extra-lesson-options">
              {question.options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === optionIndex;
                const isCorrect = lesson7QuizSubmitted && optionIndex === question.answer;
                const isWrongSelected = lesson7QuizSubmitted && isSelected && !correct;
                return (
                  <label className={`extra-lesson-option${isSelected ? " is-selected" : ""}${isCorrect ? " is-correct" : ""}${isWrongSelected ? " is-incorrect" : ""}`} key={option}>
                    <input type="radio" name={`aws-lesson7-question-${questionIndex}`} value={optionIndex} checked={isSelected} disabled={lesson7QuizSubmitted} onChange={() => handleLesson7QuizAnswer(questionIndex, optionIndex)} />
                    <span>{option}{isCorrect ? " ✓" : isWrongSelected ? " ✕" : ""}</span>
                  </label>
                );
              })}
            </div>
            {lesson7QuizSubmitted && <p className="extra-lesson-explanation"><strong>{correct ? "Correct! " : "Review this one. "}</strong>{question.explanation}</p>}
          </fieldset>
        );
      })}
      {lessonActionMessage && selectedLesson?.id === 7 && (
        <div className="lesson7-validation-message" role="status">{lessonActionMessage}</div>
      )}
      {!lesson7QuizSubmitted ? (
        <button type="submit" className="btn btn-primary" disabled={Object.keys(lesson7QuizAnswers).length !== lesson7Quiz.length}>Submit Load Balancer + Auto Scaling Quiz →</button>
      ) : (
        <div className={`extra-lesson-result${lesson7QuizPassed ? " is-passed" : " is-failed"}`} role="status">
          <strong>{lesson7QuizPassed ? "🎉 Quiz passed!" : "Keep practising"}</strong>
          <p>You scored {lesson7QuizScore}/{lesson7Quiz.length}. {lesson7QuizPassed ? "You can now complete this lesson." : "Review the explanations and try again."}</p>
          {!lesson7QuizPassed && <button type="button" className="btn btn-primary" onClick={handleLesson7QuizRetry}>Try again</button>}
        </div>
      )}
    </form>
  </div>
</section>

                      <section className="lesson1-card lesson5-section">
                        <span className="content-label">🎯 KEY TAKEAWAYS</span>
                        <div className="lesson1-takeaway-box">
                          <div>✓ Load Balancers distribute traffic across targets.</div>
                          <div>✓ Health checks help route traffic to healthy targets.</div>
                          <div>✓ Auto Scaling adjusts EC2 capacity based on demand.</div>
                          <div>✓ Minimum, desired and maximum capacity control scaling limits.</div>
                          <div>✓ Together they improve application scalability and availability.</div>
                        </div>
                      </section>
                    </div>
                  ) : selectedLesson?.id === 8 ? (
                    <div className="lesson1-page lesson8-page">

                      <section className="lesson1-hero">
                        <div className="lesson1-hero-icon"><img src="/lesson-icons/cloudwatch.svg" alt="AWS CloudWatch" /></div>

                        <div className="lesson1-hero-content">
                          <span className="lesson1-kicker">
                            MISSION 08 · AWS CLOUDWATCH
                          </span>

                          <h4>AWS CloudWatch — See What Your AWS Resources Are Doing</h4>

                          <p>
                            Learn how CloudWatch collects metrics, logs and events so
                            you can monitor applications and AWS infrastructure.
                          </p>

                          <div className="lesson1-hero-tags">
                            <span>📊 Monitoring</span>
                            <span>🚀 Beginner</span>
                            <span>⏱ ~18 min</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">👀 THE BIG IDEA</div>

                        <h4>You can't manage what you can't see.</h4>

                        <p>
                          Amazon CloudWatch gives you visibility into AWS resources
                          and applications. It helps you understand performance,
                          detect problems and respond when something goes wrong.
                        </p>

                        <div className="lesson8-big-idea">
                          <div className="lesson8-big-idea-item">
                            <span>📊</span>
                            <strong>Metrics</strong>
                            <small>Numbers that show performance</small>
                          </div>

                          <div className="lesson8-big-idea-arrow">→</div>

                          <div className="lesson8-big-idea-item">
                            <span>📝</span>
                            <strong>Logs</strong>
                            <small>Records of application activity</small>
                          </div>

                          <div className="lesson8-big-idea-arrow">→</div>

                          <div className="lesson8-big-idea-item">
                            <span>🚨</span>
                            <strong>Alarms</strong>
                            <small>Signals when conditions are met</small>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-aws-banner lesson8-banner">
                        <div className="lesson1-aws-icon">📊</div>

                        <div>
                          <div className="lesson1-banner-label">ENTER CLOUDWATCH</div>

                          <h4>AWS Monitoring & Observability</h4>

                          <p>
                            CloudWatch helps you collect, visualize and respond to
                            information generated by your AWS resources and applications.
                          </p>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">📊 YOUR FIRST MISSION</div>

                        <h4>Understand CloudWatch Metrics.</h4>

                        <p>
                          Metrics turn AWS activity into measurable signals that you
                          can watch over time and use to spot unusual behavior.
                        </p>

                        <div className="lesson1-services lesson8-services">
                          <div className="lesson1-service">
                            <div className="service-icon">🖥️</div>
                            <strong>CPU Utilization</strong>
                            <span>Processor activity</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">🌐</div>
                            <strong>Network Activity</strong>
                            <span>Network traffic</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">📈</div>
                            <strong>Request Trend</strong>
                            <span>Application activity</span>
                          </div>
                        </div>

                        <div className="lesson8-flow">
                          <div className="lesson8-flow-node">
                            <span>🖥️</span>
                            <strong>AWS Resource</strong>
                            <small>Produces activity</small>
                          </div>

                          <div className="lesson8-flow-arrow">→</div>

                          <div className="lesson8-flow-node">
                            <span>📊</span>
                            <strong>CloudWatch Metric</strong>
                            <small>Measures activity</small>
                          </div>

                          <div className="lesson8-flow-arrow">→</div>

                          <div className="lesson8-flow-node">
                            <span>👀</span>
                            <strong>You Monitor</strong>
                            <small>Spot changes</small>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">📝 CLOUDWATCH LOGS</div>

                        <h4>See what actually happened.</h4>

                        <p>
                          Logs record activity from applications and systems. They can
                          help you investigate errors, understand behavior and troubleshoot
                          problems.
                        </p>

                        <div className="lesson1-concepts lesson8-log-grid">
                          <div className="lesson1-concept">
                            <div className="concept-icon">🖥️</div>
                            <h5>EC2 / Application</h5>
                            <p>Your application or AWS resource generates activity.</p>
                            <strong>Source = Activity</strong>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">📝</div>
                            <h5>Log Data</h5>
                            <p>Activity is recorded as log information.</p>
                            <strong>Logs = Records</strong>
                          </div>

                          <div className="lesson1-concept">
                            <div className="concept-icon">☁️</div>
                            <h5>CloudWatch Logs</h5>
                            <p>Logs can be collected and inspected in CloudWatch.</p>
                            <strong>CloudWatch = Visibility</strong>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🚨 CLOUDWATCH ALARMS</div>

                        <h4>Turn monitoring into action.</h4>

                        <p>
                          Alarms evaluate metrics against configured conditions. When
                          the condition is met, the alarm can signal that something
                          needs attention.
                        </p>

                        <div className="lesson8-alarm-architecture">
                          <div className="lesson8-alarm-step">
                            <span>01</span>
                            <strong>Choose Metric</strong>
                            <small>Select what you want to monitor.</small>
                          </div>

                          <div className="lesson8-alarm-line">→</div>

                          <div className="lesson8-alarm-step">
                            <span>02</span>
                            <strong>Set Threshold</strong>
                            <small>Define the condition.</small>
                          </div>

                          <div className="lesson8-alarm-line">→</div>

                          <div className="lesson8-alarm-step">
                            <span>03</span>
                            <strong>Evaluate</strong>
                            <small>CloudWatch checks the metric.</small>
                          </div>

                          <div className="lesson8-alarm-line">→</div>

                          <div className="lesson8-alarm-step">
                            <span>04</span>
                            <strong>Alarm</strong>
                            <small>Respond when the condition is met.</small>
                          </div>
                        </div>

                        <div className="lesson8-alarm-states">
                          <div>
                            <strong>OK</strong>
                            <span>Condition is normal</span>
                          </div>

                          <div>
                            <strong>ALARM</strong>
                            <span>Configured condition is met</span>
                          </div>

                          <div>
                            <strong>INSUFFICIENT DATA</strong>
                            <span>Not enough information to evaluate</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card">
                        <div className="lesson1-section-label">🎯 YOUR CLOUDWATCH MISSION</div>

                        <h4>Think like a cloud engineer.</h4>

                        <p>
                          A production application is running on AWS. Your job is to
                          understand what is happening before a small problem becomes
                          a bigger operational issue.
                        </p>

                        <div className="lesson1-services lesson8-mission-grid">
                          <div className="lesson1-service">
                            <div className="service-icon">👀</div>
                            <strong>Observe</strong>
                            <span>Watch system activity</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">📊</div>
                            <strong>Measure</strong>
                            <span>Use metrics</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">📝</div>
                            <strong>Investigate</strong>
                            <span>Read logs</span>
                          </div>

                          <div className="lesson1-service">
                            <div className="service-icon">🚨</div>
                            <strong>Respond</strong>
                            <span>Use alarms</span>
                          </div>
                        </div>

                        <div className="lesson8-mission-visual">
                          <div>☁️ AWS Resources</div>
                          <span>↓</span>
                          <div>📊 CloudWatch</div>
                          <span>↓</span>
                          <div>👨‍💻 Cloud Engineer</div>
                        </div>
                      </section>

<section className="lesson1-challenge lesson8-quiz-card" id="lesson8-quiz">
  <div className="lesson1-challenge-content" style={{ width: "100%" }}>
    <div className="extra-lesson-section-label">CLOUDWATCH KNOWLEDGE CHECK</div>
    <h4>Can you see what CloudWatch sees?</h4>
    <p className="extra-lesson-muted">
      Answer all {lesson8Quiz.length} questions. You need at least {quizPassScore}/{lesson8Quiz.length} correct answers.
    </p>
    <form className="extra-lesson-quiz" onSubmit={(event) => { event.preventDefault(); handleLesson8QuizSubmit(); }}>
      {lesson8Quiz.map((question, questionIndex) => {
        const selectedAnswer = lesson8QuizAnswers[questionIndex];
        const correct = selectedAnswer === question.answer;
        return (
          <fieldset className="extra-lesson-question" key={question.question}>
            <legend>{questionIndex + 1}. {question.question}</legend>
            <div className="extra-lesson-options">
              {question.options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === optionIndex;
                const isCorrect = lesson8QuizSubmitted && optionIndex === question.answer;
                const isWrongSelected = lesson8QuizSubmitted && isSelected && !correct;
                return (
                  <label
                    className={`extra-lesson-option${isSelected ? " is-selected" : ""}${isCorrect ? " is-correct" : ""}${isWrongSelected ? " is-incorrect" : ""}`}
                    key={option}
                  >
                    <input
                      type="radio"
                      name={`aws-lesson8-question-${questionIndex}`}
                      value={optionIndex}
                      checked={isSelected}
                      disabled={lesson8QuizSubmitted}
                      onChange={() => handleLesson8QuizAnswer(questionIndex, optionIndex)}
                    />
                    <span>{option}{isCorrect ? " ✓" : isWrongSelected ? " ✕" : ""}</span>
                  </label>
                );
              })}
            </div>
            {lesson8QuizSubmitted && (
              <p className="extra-lesson-explanation">
                <strong>{correct ? "Correct! " : "Review this one. "}</strong>{question.explanation}
              </p>
            )}
          </fieldset>
        );
      })}
      {lessonActionMessage && selectedLesson?.id === 8 && (
        <div className="lesson8-validation-message" role="status">{lessonActionMessage}</div>
      )}
      {!lesson8QuizSubmitted ? (
        <button
          type="submit"
          className="btn btn-primary"
          disabled={Object.keys(lesson8QuizAnswers).length !== lesson8Quiz.length}
        >
          Submit CloudWatch Quiz →
        </button>
      ) : (
        <div className={`extra-lesson-result${lesson8QuizPassed ? " is-passed" : " is-failed"}`} role="status">
          <strong>{lesson8QuizPassed ? "🎉 Quiz passed!" : "Keep practising"}</strong>
          <p>
            You scored {lesson8QuizScore}/{lesson8Quiz.length}.{" "}
            {lesson8QuizPassed ? "You can now complete this lesson." : "Review the explanations and try again."}
          </p>
          {!lesson8QuizPassed && (
            <button type="button" className="btn btn-primary" onClick={handleLesson8QuizRetry}>
              Try again
            </button>
          )}
        </div>
      )}
    </form>
  </div>
</section>

                      <section className="lesson1-takeaways">
                        <div className="lesson1-section-label">🏆 KEY TAKEAWAYS</div>

                        <div className="lesson1-takeaway-grid">
                          <div>📊 Metrics <span>Performance</span></div>
                          <div>📝 Logs <span>Activity Records</span></div>
                          <div>🚨 Alarms <span>Conditions</span></div>
                          <div>👀 Monitoring <span>Visibility</span></div>
                          <div>☁️ CloudWatch <span>Observability</span></div>
                          <div>⚡ Response <span>Action</span></div>
                        </div>
                      </section>

                      <section className="lesson1-next">
                        <div>
                          <span>🔥 NEXT MISSION</span>
                          <h4>AWS Lambda — Run Code Without Managing Servers</h4>
                          <p>Get ready to move from monitoring infrastructure to serverless computing. ⚡</p>
                        </div>

                        <div className="lesson1-next-icon">→</div>
                      </section>

                    </div>
) : selectedLesson?.id === 9 ? (
                    <div className="lesson1-content lesson9-content">
                      <section className="lesson1-hero">
                        <div className="lesson1-hero-icon">λ</div>

                        <div className="lesson1-hero-content">
                          <span className="lesson1-kicker">
                            MISSION 09 · AWS LAMBDA
                          </span>

                          <h4>AWS Lambda — Run Code Without Managing Servers</h4>

                          <p>
                          Learn how AWS Lambda runs code in response to events without
                          requiring you to manage the underlying servers.
                        </p>

                        <div className="lesson1-hero-tags">
                          <span>⚡ Serverless</span>
                          <span>🚀 Beginner</span>
                          <span>⏱ ~20 min</span>
                        </div>
                      </div>
                      </section>
                      
                      <section className="lesson1-card lesson9-section">
                        <div className="lesson1-section-label">⚡ THE BIG IDEA</div>
                        <h4>Focus on your code, not the server.</h4>
                        <p>
                          AWS Lambda is a serverless compute service. You upload your
                          function code and Lambda runs it when an event or request
                          triggers the function.
                        </p>

                        <div className="lesson9-big-idea">
                          <div className="lesson9-big-idea-item">
                            <span>1</span>
                            <strong>Event</strong>
                            <p>Something happens that triggers your function.</p>
                          </div>

                          <div className="lesson9-big-idea-arrow">→</div>

                          <div className="lesson9-big-idea-item">
                            <span>2</span>
                            <strong>Lambda</strong>
                            <p>AWS invokes your function automatically.</p>
                          </div>

                          <div className="lesson9-big-idea-arrow">→</div>

                          <div className="lesson9-big-idea-item">
                            <span>3</span>
                            <strong>Result</strong>
                            <p>Your code performs an action or returns a result.</p>
                          </div>
                        </div>
                      </section>

                      <section className="lesson9-banner">
                        <div className="lesson9-banner-icon">λ</div>
                        <div>
                          <div className="lesson9-banner-label">ENTER AWS LAMBDA</div>
                          <h4>Serverless compute</h4>
                          <p>
                            Run application code without directly managing the
                            underlying servers.
                          </p>
                        </div>
                      </section>

                      <section className="lesson1-card lesson9-section">
                        <div className="lesson1-section-label">🎯 YOUR FIRST MISSION</div>
                        <h4>Understand a Lambda Function</h4>
                        <p>
                          A Lambda function is a small unit of executable code that
                          contains your application logic.
                        </p>

                        <div className="lesson9-concept-grid">
                          <div className="lesson9-concept">
                            <div className="lesson9-concept-icon">ƒ</div>
                            <strong>Function</strong>
                            <span>Your application logic.</span>
                          </div>

                          <div className="lesson9-concept">
                            <div className="lesson9-concept-icon">⚡</div>
                            <strong>Invocation</strong>
                            <span>Lambda runs the function.</span>
                          </div>

                          <div className="lesson9-concept">
                            <div className="lesson9-concept-icon">☁️</div>
                            <strong>AWS Managed</strong>
                            <span>You don't manage the servers directly.</span>
                          </div>

                          <div className="lesson9-concept">
                            <div className="lesson9-concept-icon">🔗</div>
                            <strong>AWS Services</strong>
                            <span>Functions can connect to many AWS services.</span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card lesson9-section">
                        <div className="lesson1-section-label">🎯 EVENT-DRIVEN COMPUTING</div>
                        <h4>Something happens → Lambda runs your code.</h4>
                        <p>
                          Lambda functions can be triggered by events from AWS services
                          and applications. This makes Lambda useful for event-driven
                          architectures.
                        </p>

                        <div className="lesson9-event-flow">
                          <div className="lesson9-event-step">
                            <span>01</span>
                            <strong>An event occurs</strong>
                            <small>A trigger starts the workflow.</small>
                          </div>

                          <div className="lesson9-event-arrow">↓</div>

                          <div className="lesson9-event-step">
                            <span>02</span>
                            <strong>Lambda is invoked</strong>
                            <small>The function receives the event.</small>
                          </div>

                          <div className="lesson9-event-arrow">↓</div>

                          <div className="lesson9-event-step">
                            <span>03</span>
                            <strong>Code executes</strong>
                            <small>Lambda runs your application logic.</small>
                          </div>

                          <div className="lesson9-event-arrow">↓</div>

                          <div className="lesson9-event-step">
                            <span>04</span>
                            <strong>Action or result</strong>
                            <small>The function completes its task.</small>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card lesson9-section">
                        <div className="lesson1-section-label">💰 SERVERLESS MODEL</div>
                        <h4>Run code when you need it.</h4>
                        <p>
                          With Lambda, you do not need to keep an EC2 server running
                          just to execute occasional application logic. AWS manages
                          the compute infrastructure required to run the function.
                        </p>

                        <div className="lesson9-serverless-grid">
                          <div className="lesson9-serverless-item">
                            <strong>✓ No server provisioning</strong>
                            <span>
                              No need to provision a server just for the function.
                            </span>
                          </div>

                          <div className="lesson9-serverless-item">
                            <strong>✓ Automatic scaling</strong>
                            <span>
                              Lambda can scale with incoming invocations.
                            </span>
                          </div>

                          <div className="lesson9-serverless-item">
                            <strong>✓ Usage-based model</strong>
                            <span>
                              Pay based on usage rather than maintaining an
                              always-on server.
                            </span>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-card lesson9-section">
                        <div className="lesson1-section-label">🎯 EDUCloud MISSION</div>
                        <h4>Process a new learner registration</h4>
                        <p>
                          Imagine EduCloud receives a new registration. A Lambda
                          function could be triggered by an event to validate data,
                          process the registration or perform another automated task.
                        </p>

                        <div className="lesson9-mission">
                          <div className="lesson9-mission-step">
                            <span>01</span>
                            <strong>New Learner Event</strong>
                          </div>

                          <div className="lesson9-mission-arrow">↓</div>

                          <div className="lesson9-mission-step">
                            <span>02</span>
                            <strong>AWS Lambda</strong>
                          </div>

                          <div className="lesson9-mission-arrow">↓</div>

                          <div className="lesson9-mission-step">
                            <span>03</span>
                            <strong>Run Registration Logic</strong>
                          </div>

                          <div className="lesson9-mission-arrow">↓</div>

                          <div className="lesson9-mission-step">
                            <span>04</span>
                            <strong>Store / Notify / Process</strong>
                          </div>
                        </div>
                      </section>

                      <section className="lesson1-challenge lesson9-quiz-card" id="lesson9-quiz">
  <div className="lesson1-challenge-content" style={{ width: "100%" }}>
    <div className="extra-lesson-section-label">AWS LAMBDA KNOWLEDGE CHECK</div>
    <h4>Test your AWS Lambda knowledge</h4>
    <p className="extra-lesson-muted">
      Answer all {lesson9Quiz.length} questions. You need at least {quizPassScore}/{lesson9Quiz.length} correct answers.
    </p>
    <form className="extra-lesson-quiz" onSubmit={(event) => { event.preventDefault(); handleLesson9QuizSubmit(); }}>
      {lesson9Quiz.map((question, questionIndex) => {
        const selectedAnswer = lesson9QuizAnswers[questionIndex];
        const correct = selectedAnswer === question.answer;
        return (
          <fieldset className="extra-lesson-question" key={question.question}>
            <legend>{questionIndex + 1}. {question.question}</legend>
            <div className="extra-lesson-options">
              {question.options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === optionIndex;
                const isCorrect = lesson9QuizSubmitted && optionIndex === question.answer;
                const isWrongSelected = lesson9QuizSubmitted && isSelected && !correct;
                return (
                  <label
                    className={`extra-lesson-option${isSelected ? " is-selected" : ""}${isCorrect ? " is-correct" : ""}${isWrongSelected ? " is-incorrect" : ""}`}
                    key={option}
                  >
                    <input
                      type="radio"
                      name={`aws-lesson9-question-${questionIndex}`}
                      value={optionIndex}
                      checked={isSelected}
                      disabled={lesson9QuizSubmitted}
                      onChange={() => handleLesson9QuizAnswer(questionIndex, optionIndex)}
                    />
                    <span>{option}{isCorrect ? " ✓" : isWrongSelected ? " ✕" : ""}</span>
                  </label>
                );
              })}
            </div>
            {lesson9QuizSubmitted && (
              <p className="extra-lesson-explanation">
                <strong>{correct ? "Correct! " : "Review this one. "}</strong>{question.explanation}
              </p>
            )}
          </fieldset>
        );
      })}
      {lessonActionMessage && selectedLesson?.id === 9 && (
        <div className="lesson9-validation-message" role="status">{lessonActionMessage}</div>
      )}
      {!lesson9QuizSubmitted ? (
        <button
          type="submit"
          className="btn btn-primary"
          disabled={Object.keys(lesson9QuizAnswers).length !== lesson9Quiz.length}
        >
          Submit Lambda Quiz →
        </button>
      ) : (
        <div className={`extra-lesson-result${lesson9QuizPassed ? " is-passed" : " is-failed"}`} role="status">
          <strong>{lesson9QuizPassed ? "🎉 Quiz passed!" : "Keep practising"}</strong>
          <p>
            You scored {lesson9QuizScore}/{lesson9Quiz.length}.{" "}
            {lesson9QuizPassed ? "You can now complete this lesson." : "Review the explanations and try again."}
          </p>
          {!lesson9QuizPassed && (
            <button type="button" className="btn btn-primary" onClick={handleLesson9QuizRetry}>
              Try again
            </button>
          )}
        </div>
      )}
    </form>
  </div>
</section>

                      <section className="lesson1-card lesson9-section">
                        <div className="lesson1-section-label">🏆 KEY TAKEAWAYS</div>

                        <div className="lesson9-takeaway-grid">
                          <div>✓ Lambda is a serverless compute service.</div>
                          <div>✓ Functions run when they are invoked by events or requests.</div>
                          <div>✓ AWS manages the underlying compute infrastructure.</div>
                          <div>✓ Lambda is useful for event-driven applications.</div>
                          <div>✓ Lambda can automatically scale with incoming invocations.</div>
                        </div>
                      </section>

                      <section className="lesson9-next">
                        <div>
                          <span className="lesson9-next-label">NEXT MISSION</span>
                          <h4>AWS CloudFront</h4>
                          <p>
                            Learn how CloudFront delivers content faster to users
                            around the world.
                          </p>
                        </div>

                        <div className="lesson9-next-arrow">→</div>
                      </section>

                    </div>
) : selectedLesson?.id === 10 ? (
  <div className="lesson1-page lesson10-page lesson7-content">

    {/* HERO */}
    <section className="lesson1-hero">
      <div className="lesson1-hero-icon">☁️</div>
      <div className="lesson1-hero-content">
        <div className="lesson1-section-label">AWS FUNDAMENTALS · LESSON 10</div>
        <h2>Amazon CloudFront</h2>
        <p>
          Deliver websites, applications, images and other content faster
          by serving it from locations closer to your users.
        </p>
      </div>
    </section>

    {/* DESIGN A — REQUEST JOURNEY */}
    <section className="lesson1-card lesson10-designA-section">
      <div className="lesson1-section-label">🚀 REQUEST JOURNEY</div>
      <h4>How CloudFront delivers content</h4>
      <p>Follow the request from the learner to the content source and back.</p>

      <div className="lesson10-designA-grid">
        <article className="lesson10-designA-card">
          <span className="lesson10-designA-number">01</span>
          <div className="lesson10-designA-icon">👤</div>
          <h5>User</h5>
          <p>Requests a page, image, video or other content.</p>
        </article>
        <article className="lesson10-designA-card">
          <span className="lesson10-designA-number">02</span>
          <div className="lesson10-designA-icon">🌐</div>
          <h5>CloudFront</h5>
          <p>Receives the request through its distribution.</p>
        </article>
        <article className="lesson10-designA-card">
          <span className="lesson10-designA-number">03</span>
          <div className="lesson10-designA-icon">📍</div>
          <h5>Edge Location</h5>
          <p>Checks its cache and serves content when available.</p>
        </article>
        <article className="lesson10-designA-card">
          <span className="lesson10-designA-number">04</span>
          <div className="lesson10-designA-icon">🗄️</div>
          <h5>Origin</h5>
          <p>Provides the content when CloudFront needs to fetch it.</p>
        </article>
      </div>
      <p className="lesson10-designA-note">
        <strong>Remember:</strong> A cache hit can be served from an edge location.
        If the content is not cached, CloudFront can fetch it from the origin.
      </p>
    </section>

    {/* DESIGN A — KEY BENEFITS */}
    <section className="lesson1-card lesson10-designA-section">
      <div className="lesson1-section-label">⚡ KEY BENEFITS</div>
      <h4>Why use CloudFront?</h4>

      <div className="lesson10-designA-grid">
        <article className="lesson10-designA-card lesson10-designA-benefit">
          <div className="lesson10-designA-icon">⚡</div>
          <h5>Lower latency</h5>
          <p>Serve content from locations closer to users.</p>
        </article>
        <article className="lesson10-designA-card lesson10-designA-benefit">
          <div className="lesson10-designA-icon">🚀</div>
          <h5>Faster delivery</h5>
          <p>Cache frequently requested content at edge locations.</p>
        </article>
        <article className="lesson10-designA-card lesson10-designA-benefit">
          <div className="lesson10-designA-icon">🌍</div>
          <h5>Global reach</h5>
          <p>Deliver content to users across different regions.</p>
        </article>
        <article className="lesson10-designA-card lesson10-designA-benefit">
          <div className="lesson10-designA-icon">🛡️</div>
          <h5>Reduced origin load</h5>
          <p>Cached responses can reduce repeated requests to the origin.</p>
        </article>
      </div>
    </section>

    <section className="lesson1-challenge lesson10-quiz-card" id="lesson10-quiz">
  <div className="lesson1-challenge-content" style={{ width: "100%" }}>
    <div className="extra-lesson-section-label">CLOUDFRONT KNOWLEDGE CHECK</div>
    <h4>Test your AWS CloudFront knowledge</h4>
    <p className="extra-lesson-muted">
      Answer all {lesson10Quiz.length} questions. You need at least {quizPassScore}/{lesson10Quiz.length} correct answers to pass.
    </p>
    <form className="extra-lesson-quiz" onSubmit={(event) => { event.preventDefault(); handleLesson10QuizSubmit(); }}>
      {lesson10Quiz.map((question, questionIndex) => {
        const selectedAnswer = lesson10QuizAnswers[questionIndex];
        const correct = selectedAnswer === question.answer;
        return (
          <fieldset className="extra-lesson-question" key={question.question}>
            <legend>{questionIndex + 1}. {question.question}</legend>
            <div className="extra-lesson-options">
              {question.options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === optionIndex;
                const isCorrect = lesson10QuizSubmitted && optionIndex === question.answer;
                const isWrongSelected = lesson10QuizSubmitted && isSelected && !correct;
                return (
                  <label
                    className={`extra-lesson-option${isSelected ? " is-selected" : ""}${isCorrect ? " is-correct" : ""}${isWrongSelected ? " is-incorrect" : ""}`}
                    key={option}
                  >
                    <input
                      type="radio"
                      name={`aws-lesson10-question-${questionIndex}`}
                      value={optionIndex}
                      checked={isSelected}
                      disabled={lesson10QuizSubmitted}
                      onChange={() => handleLesson10QuizAnswer(questionIndex, optionIndex)}
                    />
                    <span>{option}{isCorrect ? " ✓" : isWrongSelected ? " ✕" : ""}</span>
                  </label>
                );
              })}
            </div>
            {lesson10QuizSubmitted && (
              <p className="extra-lesson-explanation">
                <strong>{correct ? "Correct! " : "Review this one. "}</strong>{question.explanation}
              </p>
            )}
          </fieldset>
        );
      })}
      {lessonActionMessage && selectedLesson?.id === 10 && (
        <div className="lesson10-validation-message" role="status">{lessonActionMessage}</div>
      )}
      {!lesson10QuizSubmitted ? (
        <button
          type="submit"
          className="btn btn-primary"
          disabled={Object.keys(lesson10QuizAnswers).length !== lesson10Quiz.length}
        >
          Submit CloudFront Quiz →
        </button>
      ) : (
        <div className={`extra-lesson-result${lesson10QuizPassed ? " is-passed" : " is-failed"}`} role="status">
          <strong>{lesson10QuizPassed ? "🎉 Quiz passed!" : "Keep practising"}</strong>
          <p>
            You scored {lesson10QuizScore}/{lesson10Quiz.length}.{" "}
            {lesson10QuizPassed ? "You can now complete this lesson." : "Review the explanations and try again."}
          </p>
          {!lesson10QuizPassed && (
            <button type="button" className="btn btn-primary" onClick={handleLesson10QuizRetry}>
              Try again
            </button>
          )}
        </div>
      )}
    </form>
  </div>
</section>

    {/* KEY TAKEAWAYS */}
    <section className="lesson1-takeaways">
      <div className="lesson1-section-label">🏆 KEY TAKEAWAYS</div>

      <div className="lesson1-takeaway-grid">
        <div>✓ CloudFront is AWS's content delivery network.</div>
        <div>✓ Edge locations help serve content closer to users.</div>
        <div>✓ CloudFront can cache frequently requested content.</div>
        <div>✓ An origin is the source of the content.</div>
        <div>✓ CloudFront can reduce latency for global users.</div>
        <div>✓ A distribution controls CloudFront delivery behavior.</div>
      </div>
    </section>

    {/* NEXT MISSION */}
    <section className="lesson1-next">
      <div>
        <div className="lesson1-section-label">NEXT MISSION</div>
        <h4>Keep building your AWS foundation</h4>
        <p>
          You now understand how AWS can deliver content efficiently to users.
        </p>
      </div>
      <div className="lesson10-next-arrow">→</div>
    </section>

  </div>
) : (
                    <div className="generic-lesson-content">
                      <div className="lesson-description-box">
                        <span className="content-label">📚 LESSON OVERVIEW</span>
                        <p>
                          {selectedLesson.content ||
                            "This lesson contains practical learning content. Work through the lesson and complete it when you are ready."}
                        </p>
                      </div>
                      <div className="coming-soon-box">
                        🚀 More hands-on content for this lesson is coming next.
                      </div>
                    </div>
                  )}

                  <div className="lesson-actions">
                    <button
                      className="btn btn-primary"
                      onClick={handleNextLesson}
                      disabled={progressLoading}
                    >
                      {progressLoading
                        ? "Saving..."
                        : selectedLesson.id === lessons[lessons.length - 1]?.id
                        ? completedLessons.includes(selectedLesson.id)
                          ? "Course Completed ✓"
                          : "Complete Course ✓"
                        : completedLessons.includes(selectedLesson.id)
                        ? "Completed ✓"
                        : selectedLesson.id === 1 && !quizPassed
                        ? "Pass Quiz to Complete →"
                        : selectedLesson.id === 2 && !lesson2QuizPassed
                        ? "Pass EC2 Quiz to Complete →"
                        : selectedLesson.id === 3 && !lesson3QuizPassed
                        ? "Pass S3 Quiz to Complete →"
                        : selectedLesson.id === 4 && !lesson4QuizPassed
                        ? "Pass IAM Quiz to Complete →"
                        : selectedLesson.id === 5 && !lesson5QuizPassed
                        ? "Pass RDS Quiz to Complete →"
                        : selectedLesson.id === 6 && !lesson6QuizPassed
                        ? "Pass VPC Quiz to Complete →"
                        : selectedLesson.id === 7 && !lesson7QuizPassed
                        ? "Pass Load Balancer Quiz to Complete →"
                        : selectedLesson.id === 8 && !lesson8QuizPassed
                        ? "Pass CloudWatch Quiz to Complete →"
                        : selectedLesson.id === 9 && !lesson9QuizPassed
                        ? "Pass Lambda Quiz to Complete →"
                        : selectedLesson.id === 10 && !lesson10QuizPassed
                        ? "Pass CloudFront Quiz to Complete →"
                        : "Complete & Next →"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="section section-light" id="why">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">WHY EDUCloud</span>
              <h2>Learn by actually building</h2>
              <p>EduCloud focuses on practical technical skills instead of only theory.</p>
            </div>

            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">⚙️</div>
                <h3>Hands-on Learning</h3>
                <p>Practice concepts through real commands, labs and technical exercises.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">☁️</div>
                <h3>AWS Projects</h3>
                <p>Deploy applications and learn how cloud services work together.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Real Deployment</h3>
                <p>Build and deploy projects on real cloud infrastructure.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">PRACTICAL PROJECTS</span>
                <h2>Build your cloud portfolio</h2>
              </div>
              <p>Projects designed to help you understand how production systems work.</p>
            </div>

            <div className="project-grid">
              <div className="project-card">
                <span>01</span>
                <h3>Deploy a Web App</h3>
                <p>Deploy a React application on an AWS server using Nginx.</p>
              </div>
              <div className="project-card">
                <span>02</span>
                <h3>Connect RDS PostgreSQL</h3>
                <p>Connect a Node.js backend to Amazon RDS PostgreSQL.</p>
              </div>
              <div className="project-card">
                <span>03</span>
                <h3>Linux Server Setup</h3>
                <p>Configure and manage a Linux cloud server using practical commands.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section" id="about">
          <div className="container cta-inner">
            <div>
              <span className="eyebrow">START TODAY</span>
              <h2>Ready to build your first cloud project?</h2>
              <p>Create your account and start learning practical cloud and DevOps skills.</p>
            </div>

            <button
              className="btn btn-primary btn-large"
              onClick={() => {
                if (!user) setAuthMode("register");
                else document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {user ? "Explore Courses" : "Create Account"}
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <strong>EduCloud</strong>
            <p>Learn. Build. Deploy.</p>
          </div>
          <span>© 2026 EduCloud. All rights reserved.</span>
        </div>
      </footer>

      {authMode && (
        <div className="auth-overlay" onClick={() => setAuthMode(null)}>
          <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
            <button className="auth-close" onClick={() => setAuthMode(null)}>×</button>

            <div className="auth-header">
              <span className="eyebrow">
                {authMode === "login"
                  ? "WELCOME BACK"
                  : authMode === "register"
                  ? "GET STARTED"
                  : authMode === "forgot"
                  ? "PASSWORD RECOVERY"
                  : "RESET PASSWORD"}
              </span>

              <h2>
                {authMode === "login"
                  ? "Login to EduCloud"
                  : authMode === "register"
                  ? "Create your EduCloud account"
                  : authMode === "forgot"
                  ? "Forgot your password?"
                  : "Create a new password"}
              </h2>

              <p>
                {authMode === "login"
                  ? "Continue your learning journey."
                  : authMode === "register"
                  ? "Start learning practical cloud and DevOps skills."
                  : authMode === "forgot"
                  ? "Enter your email and we will send you a reset link."
                  : "Choose a new password for your EduCloud account."}
              </p>
            </div>

            {authMode === "forgot" ? (
              <form onSubmit={handleForgotPassword}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={authForm.email}
                    onChange={handleAuthChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {authMessage && <div className="auth-message">{authMessage}</div>}

                <button
                  type="submit"
                  className="btn btn-primary auth-submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            ) : authMode === "reset" ? (
              <form onSubmit={handleResetPassword}>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={resetForm.password}
                    onChange={(event) =>
                      setResetForm((previous) => ({
                        ...previous,
                        password: event.target.value,
                      }))
                    }
                    placeholder="Enter new password"
                    minLength={6}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    value={resetForm.confirmPassword}
                    onChange={(event) =>
                      setResetForm((previous) => ({
                        ...previous,
                        confirmPassword: event.target.value,
                      }))
                    }
                    placeholder="Confirm new password"
                    minLength={6}
                    required
                  />
                </div>

                {authMessage && <div className="auth-message">{authMessage}</div>}

                <button
                  type="submit"
                  className="btn btn-primary auth-submit"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleAuthSubmit}>
                {authMode === "register" && (
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={authForm.name}
                      onChange={handleAuthChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={authForm.email}
                    onChange={handleAuthChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={authForm.password}
                    onChange={handleAuthChange}
                    placeholder="Enter your password"
                    minLength={6}
                    required
                  />
                </div>

                {authMode === "login" && (
                  <div style={{ textAlign: "right", marginBottom: "16px" }}>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("forgot");
                        setAuthMessage("");
                      }}
                      style={{
                        border: "none",
                        background: "none",
                        color: "#2563eb",
                        cursor: "pointer",
                        padding: 0,
                        fontSize: "14px",
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {authMessage && <div className="auth-message">{authMessage}</div>}

                <button
                  type="submit"
                  className="btn btn-primary auth-submit"
                  disabled={loading}
                >
                  {loading
                    ? "Please wait..."
                    : authMode === "login"
                    ? "Login"
                    : "Create Account"}
                </button>
              </form>
            )}

            <div className="auth-switch">
              {authMode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      setAuthMode("register");
                      setAuthMessage("");
                    }}
                  >
                    Register
                  </button>
                </>
              ) : authMode === "register" ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setAuthMessage("");
                    }}
                  >
                    Login
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setAuthMessage("");
                  }}
                >
                  Back to Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

