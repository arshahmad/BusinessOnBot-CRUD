export interface UserModel {
  createdAt:    Date;
  name:         string | null;
  avatar:       string;
  id:           string;
  recent_posts: Post[];
}

 interface Post {
  createdAt: Date;
  Title:     string;
  content:   string;
  id:        string;
  userId:    string;
}

