import product1 from '../../../../assets/product-1.jpg';
import product2 from '../../../../assets/product-2.jpg';
import product3 from '../../../../assets/product-3.jpg';
import product4 from '../../../../assets/product-4.jpg';
import category1 from '../../../../assets/category-1.jpg';
import category2 from '../../../../assets/category-2.jpg';
import category3 from '../../../../assets/category-3.jpg';
import category4 from '../../../../assets/category-4.jpg';
 
 
 export const mockOrders = [
        {
          id: "1",
          orderNumber: "JMD-10025",
          date: "2025-05-08T09:30:00Z",
          customer: {
            name: "রহিম আহমেদ",
            email: "rahim.ahmed@example.com",
            phone: "01712345678",
            avatar: product1,
          },
          products: [
            {
              id: "p1",
              name: "লাল জামদানি শাড়ি",
              price: 15000,
              quantity: 1,
              image: product1,
            },
          ],
          status: "delivered",
          payment: {
            method: "bKash",
            status: "paid",
            amount: 15000,
            transactionId: "TXN123456",
          },
          shipping: {
            address: "১২৩ গুলশান এভিনিউ",
            city: "ঢাকা",
            postalCode: "1212",
            method: "হোম ডেলিভারি",
            trackingNumber: "BD123456789",
          },
        },
        {
          id: "2",
          orderNumber: "JMD-10026",
          date: "2025-05-08T14:45:00Z",
          customer: {
            name: "নাজমা বেগম",
            email: "najmabegum@example.com",
            phone: "01812345678",
          },
          products: [
            {
              id: "p2",
              name: "নীল সিল্ক জামদানি শাড়ি",
              price: 18500,
              quantity: 1,
              image: product2,
            },
            {
              id: "p3",
              name: "জামদানি ওড়না",
              price: 3500,
              quantity: 2,
              image: product3,
            },
          ],
          status: "processing",
          payment: {
            method: "নগদ",
            status: "paid",
            amount: 25500,
            transactionId: "TXN789012",
          },
          shipping: {
            address: "৪৫৬ ধানমন্ডি",
            city: "ঢাকা",
            postalCode: "1209",
            method: "হোম ডেলিভারি",
          },
        },
        {
          id: "3",
          orderNumber: "JMD-10027",
          date: "2025-05-07T11:20:00Z",
          customer: {
            name: "করিম মিয়া",
            email: "karim.mia@example.com",
            phone: "01912345678",
          },
          products: [
            {
              id: "p4",
              name: "সবুজ জামদানি শাড়ি",
              price: 16000,
              quantity: 1,
              image: product4,
            },
          ],
          status: "shipped",
          payment: {
            method: "ক্যাশ অন ডেলিভারি",
            status: "pending",
            amount: 16000,
          },
          shipping: {
            address: "৭৮৯ মিরপুর রোড",
            city: "ঢাকা",
            postalCode: "1216",
            method: "হোম ডেলিভারি",
            trackingNumber: "BD987654321",
          },
        },
        {
          id: "4",
          orderNumber: "JMD-10028",
          date: "2025-05-06T16:15:00Z",
          customer: {
            name: "সালমা খাতুন",
            email: "salma.khatun@example.com",
            phone: "01612345678",
          },
          products: [
            {
              id: "p5",
              name: "সাদা জামদানি শাড়ি",
              price: 14500,
              quantity: 1,
              image: product1,
            },
          ],
          status: "pending",
          payment: {
            method: "ক্রেডিট কার্ড",
            status: "paid",
            amount: 14500,
            transactionId: "TXN345678",
          },
          shipping: {
            address: "১০১ উত্তরা সেক্টর-১০",
            city: "ঢাকা",
            postalCode: "1230",
            method: "হোম ডেলিভারি",
          },
        },
        {
          id: "5",
          orderNumber: "JMD-10029",
          date: "2025-05-05T10:10:00Z",
          customer: {
            name: "মাহমুদুল হাসান",
            email: "mahmud@example.com",
            phone: "01512345678",
          },
          products: [
            {
              id: "p6",
              name: "গোলাপি জামদানি শাড়ি",
              price: 17500,
              quantity: 1,
              image: product2,
            },
          ],
          status: "cancelled",
          payment: {
            method: "বিকাশ",
            status: "refunded",
            amount: 17500,
            transactionId: "TXN567890",
          },
          shipping: {
            address: "২২৩ বনানী",
            city: "ঢাকা",
            postalCode: "1213",
            method: "হোম ডেলিভারি",
          },
          notes: "গ্রাহক আকার পরিবর্তন করতে চেয়েছেন",
        },
        {
          id: "6",
          orderNumber: "JMD-10030",
          date: "2025-05-04T13:25:00Z",
          customer: {
            name: "ফারহানা ইসলাম",
            email: "farhana@example.com",
            phone: "01812345679",
          },
          products: [
            {
              id: "p7",
              name: "হলুদ জামদানি শাড়ি",
              price: 13500,
              quantity: 1,
              image: product3,
            },
            {
              id: "p8",
              name: "জামদানি ব্লাউজ পিস",
              price: 2500,
              quantity: 1,
              image: product4,
            },
          ],
          status: "returned",
          payment: {
            method: "বিকাশ",
            status: "refunded",
            amount: 16000,
            transactionId: "TXN678901",
          },
          shipping: {
            address: "৪৫৬ মোহাম্মদপুর",
            city: "ঢাকা",
            postalCode: "1207",
            method: "হোম ডেলিভারি",
            trackingNumber: "BD567891234",
          },
          notes: "পণ্যের রং ভিন্ন আসায় ফেরত দেওয়া হয়েছে",
        },
      ];