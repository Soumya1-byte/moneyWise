import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(req: Request) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const { lessonId, quizId, xp, badge } = await req.json();
    await dbConnect();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (lessonId && !user.progress.completedLessons.includes(lessonId)) {
      user.progress.completedLessons.push(lessonId);
    }

    if (quizId && !user.progress.completedQuizzes.includes(quizId)) {
      user.progress.completedQuizzes.push(quizId);
    }

    if (xp) {
      user.progress.xp += xp;
      user.progress.level = Math.floor(user.progress.xp / 100) + 1;
    }

    if (badge && !user.progress.badges.includes(badge)) {
      user.progress.badges.push(badge);
    }

    user.progress.lastActive = new Date();
    await user.save();

    return NextResponse.json({ progress: user.progress });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
