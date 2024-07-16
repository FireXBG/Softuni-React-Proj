import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

export default function CloseTable({ table }) {
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const generateReceipt = async () => {
            try {
                const doc = new jsPDF();
                const pageWidth = doc.internal.pageSize.getWidth();
                const margin = 10;
                const lineHeight = 10;
                let y = margin;

                doc.setFont('courier', 'normal');

                doc.setFontSize(16);
                doc.text('Restaurant Name', pageWidth / 2, y, { align: 'center' });
                y += lineHeight;
                doc.setFontSize(12);
                doc.text('Address Line 1', pageWidth / 2, y, { align: 'center' });
                y += lineHeight;
                doc.text('Address Line 2', pageWidth / 2, y, { align: 'center' });
                y += lineHeight;
                doc.text('Phone Number', pageWidth / 2, y, { align: 'center' });
                y += lineHeight * 2;

                doc.setFontSize(12);
                doc.text(`Table Number: ${table.tableNumber}`, margin, y);
                y += lineHeight;
                const currentDate = new Date().toLocaleString();
                doc.text(`Date: ${currentDate}`, margin, y);
                y += lineHeight * 2;

                doc.setFontSize(10);
                doc.text('Orders:', margin, y);
                y += lineHeight;
                let total = 0;
                table.orders.forEach((order, index) => {
                    doc.text(`${index + 1}. ${order.name} - $${order.price.toFixed(2)}`, margin, y);
                    y += lineHeight;
                    total += order.price;
                });

                y += lineHeight;
                doc.setFontSize(12);
                doc.text(`Total: $${total.toFixed(2)}`, margin, y);

                y += lineHeight * 2;
                doc.setFontSize(10);
                doc.text('Thank you for dining with us!', pageWidth / 2, y, { align: 'center' });

                doc.save(`table-${table.tableNumber}-bill.pdf`);

                const response = await fetch('http://localhost:3001/api/operations/closeTable', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ tableNumber: table.tableNumber })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                alert(error);
            }
        };

        generateReceipt();
    }, [table]);

    useEffect(() => {
        if (countdown === 0) {
            navigate('/tables');
        } else {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown, navigate]);

    return (
        <div>
            <p>Table {table.tableNumber} has been closed. Receipt has been generated.</p>
            <p>Redirecting to tables in {countdown} seconds...</p>
        </div>
    );
}