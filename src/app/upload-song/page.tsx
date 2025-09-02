          "use client";
          import React, { useEffect, useState } from "react";
          import Image from "next/image";
          import { supabase } from "@/lib/SupabaseCLient";
          import { useRouter } from "next/navigation";
          import useUserSession from "@/custom-hooks/useUserSession";

          export default function Page() {
            const router = useRouter();
            const [title, setTitle] = useState("");
            const [artist, setArtist] = useState("");
            const [audioFile, setAudioFile] = useState<File | null>(null);
            const [imageFile, setImageFile] = useState<File | null>(null);
            const [message, setMessage] = useState("");
            const [loading, setLoading] = useState(false);
            const [pageLoading, setPageLoading] = useState(true);
            const { session } = useUserSession();

            useEffect(() => {
              supabase.auth.getSession().then(({ data }) => {
                if (!data.session) {
                  router.push("/");
                } else {
                  setPageLoading(false);
                }
              });
            }, [router]);

            const handleUpload = async (e: React.FormEvent) => {
              e.preventDefault();
              setLoading(true);

              if (!title.trim() || !artist.trim() || !audioFile || !imageFile) {
                setMessage("All fields are required");
                setLoading(false);
                return;
              }

              try {
                const timestamp = Date.now();

                // ✅ Upload the image
                const imagePath = `${timestamp}_${imageFile.name}`;
                const { error: imageError } = await supabase.storage
                  .from("cover-images")
                  .upload(imagePath, imageFile);

                if (imageError) {
                  setMessage(imageError.message);
                  setLoading(false);
                  return;
                }

                // Get public URL for image
                const {
                  data: { publicUrl: imageURL },
                } = supabase.storage.from("cover-images").getPublicUrl(imagePath);

                // ✅ Upload the audio
                const audioPath = `${timestamp}_${audioFile.name}`;
                const { error: audioError } = await supabase.storage
                  .from("songs")
                  .upload(audioPath, audioFile);

                if (audioError) {
                  setMessage(audioError.message);
                  setLoading(false);
                  return;
                }

                // Get public URL for audio
                const {
                  data: { publicUrl: audioURL },
                } = supabase.storage.from("songs").getPublicUrl(audioPath);

                // ✅ Insert song into table
                const { error: insertError } = await supabase.from("songs").insert({
                  title,
                  artist,
                  cover_image_url: imageURL,
                  audio_url: audioURL,
                  user_id: session?.user.id,
                });

                if (insertError) {
                  setMessage(insertError.message);
                  setLoading(false);
                  return;
                }

                // Reset form
                setTitle("");
                setArtist("");
                setImageFile(null);
                setAudioFile(null);
                setMessage("Song uploaded successfully ✅");

                setTimeout(() => {
                  router.push("/");
                }, 3000);
              } catch (err) {
                console.error("Caught error:", err);
                setMessage("Unexpected error occurred");
              } finally {
                setLoading(false);
              }
            };

            if (pageLoading) return null;

            return (
              <div className="h-screen flex justify-center items-center w-full bg-hover">
                <div
                  className="bg-background flex flex-col items-center px-6 lg:px-12 py-6 
                rounded-md max-w-[400px] w-[90%]"
                >
                  <Image
                    src="/images/logo.jpg"
                    alt="logo"
                    width={500}
                    height={500}
                    className="h-11 w-11"
                  />
                  <h2 className="text-2xl font-bold text-white my-2 mb-8 ">
                    Upload to Best Music
                  </h2>
                  <form onSubmit={handleUpload}>
                    {message && (
                      <p className="bg-primary font-semibold text-center mb-4 py-1">
                        {message}
                      </p>
                    )}
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      placeholder="Title"
                      className="outline-none border-1 
                    border-neutral-600 p-2 w-full rounded-md text-primary-text
                    placeholder-neutral-600 mb-6 focus:text-secondary-text"
                    />
                    <input
                      value={artist}
                      onChange={(e) => setArtist(e.target.value)}
                      type="text"
                      placeholder="Artist"
                      className="outline-none border-1 
                    border-neutral-600 p-2 w-full rounded-md text-primary-text
                    placeholder-neutral-600 mb-6 focus:text-secondary-text"
                    />
                    <label htmlFor="audio" className="block py-2 text-secondary-text">
                      Audio
                    </label>
                    <input
                      accept="audio/*"
                      id="audio"
                      type="file"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (!files) return;
                        setAudioFile(files[0]);
                      }}
                      className="outline-none border-1 
                    border-neutral-600 p-2 w-full rounded-md text-primary-text
                    placeholder-neutral-600 mb-6 focus:text-secondary-text"
                    />

                    <label htmlFor="cover" className="block py-2 text-secondary-text">
                      Cover Image
                    </label>
                    <input
                      accept="image/*"
                      id="cover"
                      type="file"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (!files) return;
                        setImageFile(files[0]);
                      }}
                      className="outline-none border-1 
                    border-neutral-600 p-2 w-full rounded-md text-primary-text
                    placeholder-neutral-600 mb-6 focus:text-secondary-text"
                    />
                    {loading ? (
                      <button
                        disabled
                        className="bg-primary py-3 rounded-full w-full font-bold cursor-not-allowed"
                      >
                        Uploading...
                      </button>
                    ) : (
                      <button className="bg-primary py-3 rounded-full w-full font-bold cursor-pointer ">
                        Add Song
                      </button>
                    )}
                  </form>
                </div>
              </div>
            );
          }
