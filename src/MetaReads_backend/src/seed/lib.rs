use crate::author::lib::seed_author;
use crate::book::lib::seed_book;
use crate::genre::lib::seed_genre;
use crate::plan::lib::seed_plan;

pub async fn seed_data() {
    let plans = vec![
        seed_plan("Free".to_string(), 0, 0).await,
        seed_plan("Standard".to_string(), 10, 100).await,
        seed_plan("Premium".to_string(), 20, 200).await,
    ];

    let authors = vec![
        seed_author("Lewis Carroll".to_string()).await.unwrap(),
        seed_author("Mark Twain".to_string()).await.unwrap(),
        seed_author("Arthur Conan Doyle".to_string()).await.unwrap(),
        seed_author("Howard Pyle".to_string()).await.unwrap(),
        seed_author("L. Frank Baum".to_string()).await.unwrap(),
        seed_author("Edith Nesbit".to_string()).await.unwrap(),
    ];

    let genres = vec![
        seed_genre("Fairy Tale".to_string()).await.unwrap(),
        seed_genre("Adventure".to_string()).await.unwrap(),
        seed_genre("Detective".to_string()).await.unwrap(),
        seed_genre("Historical Fiction".to_string()).await.unwrap(),
        seed_genre("Christmas Stories".to_string()).await.unwrap(),
        seed_genre("Fiction".to_string()).await.unwrap(),
        seed_genre("Folk".to_string()).await.unwrap(),
    ];
    if let (Some(author1), Some(genre1)) = (authors.get(0), genres.get(0)) {
        seed_book(
            "Alice's Adventures in Wonderland".to_string(),
            "Alice's Adventures in Wonderland is a fantasy novel that follows Alice's journey in a magical world.".to_string(),
            "https://covers.openlibrary.org/b/id/10527843-L.jpg".to_string(),
            author1.id,
            genre1.id,
            120,
            "https://firebasestorage.googleapis.com/v0/b/hackaton-5c2b6.appspot.com/o/books%2F1730814892904%20-%20Remember?alt=media&token=adf753a1-79d1-4544-90a8-a7c9193f4a7a".to_string(),
            "Free".to_string(),
        ).await;
    }

    if let (Some(author2), Some(genre1)) = (authors.get(1), genres.get(0)) {
        seed_book(
            "Adventures of Huckleberry Finn".to_string(),
            "A classic story of Huck Finn and his journey with Jim along the Mississippi River."
                .to_string(),
            "https://covers.openlibrary.org/b/id/8157718-L.jpg".to_string(),
            author2.id,
            genre1.id,
            100,
            "https://firebasestorage.googleapis.com/v0/b/hackaton-5c2b6.appspot.com/o/books%2F1730814892904%20-%20Remember?alt=media&token=adf753a1-79d1-4544-90a8-a7c9193f4a7a".to_string(),
            "Standard".to_string(),
        )
        .await;
    }

    if let (Some(author2), Some(genre2)) = (authors.get(1), genres.get(1)) {
        seed_book(
            "The Adventures of Tom Sawyer".to_string(),
            "A tale of a mischievous boy's adventures along the Mississippi River.".to_string(),
            "https://covers.openlibrary.org/b/id/12043351-L.jpg".to_string(),
            author2.id,
            genre2.id,
            150,
            "https://firebasestorage.googleapis.com/v0/b/hackaton-5c2b6.appspot.com/o/books%2F1730814892904%20-%20Remember?alt=media&token=adf753a1-79d1-4544-90a8-a7c9193f4a7a".to_string(),
            "Premium".to_string(),
        )
        .await;
    }

    if let (Some(author3), Some(genre3)) = (authors.get(2), genres.get(2)) {
        seed_book(
            "The Adventures of Sherlock Holmes".to_string(),
            "A collection of detective stories featuring Sherlock Holmes.".to_string(),
            "https://covers.openlibrary.org/b/id/6717853-L.jpg".to_string(),
            author3.id,
            genre3.id,
            170,
            "https://firebasestorage.googleapis.com/v0/b/hackaton-5c2b6.appspot.com/o/books%2F1730814892904%20-%20Remember?alt=media&token=adf753a1-79d1-4544-90a8-a7c9193f4a7a".to_string(),
            "Premium".to_string(),
        )
        .await;
    }

    if let (Some(author4), Some(genre4)) = (authors.get(3), genres.get(3)) {
        seed_book(
            "The Merry Adventures of Robin Hood".to_string(),
            "A retelling of the Robin Hood legend with heroic exploits.".to_string(),
            "https://covers.openlibrary.org/b/id/5913135-L.jpg".to_string(),
            author4.id,
            genre4.id,
            120,
            "https://firebasestorage.googleapis.com/v0/b/hackaton-5c2b6.appspot.com/o/books%2F1730814892904%20-%20Remember?alt=media&token=adf753a1-79d1-4544-90a8-a7c9193f4a7a".to_string(),
            "Standard".to_string(),
        )
        .await;
    }

    if let (Some(author5), Some(genre5)) = (authors.get(4), genres.get(4)) {
        seed_book(
            "The Complete Life and Adventures of Santa Claus".to_string(),
            "A fantasy story about Santa Claus’s life and adventures.".to_string(),
            "https://covers.openlibrary.org/b/id/1979059-L.jpg".to_string(),
            author5.id,
            genre5.id,
            119,
            "https://firebasestorage.googleapis.com/v0/b/hackaton-5c2b6.appspot.com/o/books%2F1730814892904%20-%20Remember?alt=media&token=adf753a1-79d1-4544-90a8-a7c9193f4a7a".to_string(),
            "Standard".to_string(),
        )
        .await;
    }

    if let (Some(author6), Some(genre6)) = (authors.get(5), genres.get(5)) {
        seed_book(
            "The Story of the Treasure Seekers".to_string(),
            "The adventures of the Bastable children as they seek fortune.".to_string(),
            "https://covers.openlibrary.org/b/id/13241364-L.jpg".to_string(),
            author6.id,
            genre6.id,
            85,
            "https://firebasestorage.googleapis.com/v0/b/hackaton-5c2b6.appspot.com/o/books%2F1730814892904%20-%20Remember?alt=media&token=adf753a1-79d1-4544-90a8-a7c9193f4a7a".to_string(),
            "Free".to_string(),
        )
        .await;
    }
    if let (Some(author6), Some(genre6)) = (authors.get(5), genres.get(5)) {
        seed_book(
            "Adventures of Huckleberry Finn / Adventures of Tom Sawyer".to_string(),
            "The Adventures of Tom Sawyer is a novel by Mark Twain published in 1876 about a boy, Tom Sawyer, growing up along the Mississippi River. Often accompanied by his friend Huckleberry Finn, Tom goes on several adventures in the fictional town of St. Petersburg.".to_string(),
            "https://covers.openlibrary.org/b/id/12374727-L.jpg".to_string(),
            author6.id,
            genre6.id,
            100,
            "https://firebasestorage.googleapis.com/v0/b/hackaton-5c2b6.appspot.com/o/books%2F1730814892904%20-%20Remember?alt=media&token=adf753a1-79d1-4544-90a8-a7c9193f4a7a".to_string(),
            "Free".to_string(),
        )
        .await;
    }

    if let (Some(author6), Some(genre6)) = (authors.get(5), genres.get(5)) {
        seed_book(
            "The Adventures of Gerard".to_string(),
            "The Adventures of Gerard is a collection of short stories by Sir Arthur Conan Doyle featuring the dashing French hussar Brigadier Gerard, detailing his adventures and exploits during the Napoleonic Wars.".to_string(),
            "https://covers.openlibrary.org/b/id/8243324-L.jpg".to_string(),
            author6.id,
            genre6.id,
            121,
            "https://firebasestorage.googleapis.com/v0/b/hackaton-5c2b6.appspot.com/o/books%2F1730814892904%20-%20Remember?alt=media&token=adf753a1-79d1-4544-90a8-a7c9193f4a7a".to_string(),
            "Premium".to_string(),
        )
        .await;
    }
    ic_cdk::println!("Seeded author, genre, and book successfully!");
}
